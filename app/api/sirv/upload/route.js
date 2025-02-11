import { NextResponse } from 'next/server';

const SIRV_CLIENT_ID = process.env.NEXT_PUBLIC_SIRV_CLIENT_ID;
const SIRV_CLIENT_SECRET = process.env.NEXT_PUBLIC_SIRV_CLIENT_SECRET;
const SIRV_API_ENDPOINT = 'https://api.sirv.com/v2/files/upload';

// Token cache with expiration
let tokenCache = {
  token: null,
  expiresAt: null
};

/**
 * Sanitize filename according to Sirv's UNIX filename requirements
 * @param {string} filename - Original filename
 * @returns {string} - Sanitized filename
 */
const sanitizeFilename = (filename) => {
  // Start with a letter, followed by only letters and numbers
  const timestamp = Date.now();
  // Ensure we start with a forward slash as per Sirv's requirements
  return encodeURIComponent(`/${timestamp}.jpg`);
};

/**
 * Sanitize folder path according to Sirv's requirements
 * @param {string} folder - Original folder path
 * @returns {string} - Sanitized folder path
 */
const sanitizeFolderPath = (folder) => {
  if (!folder) return '';

  return folder
    .normalize('NFKC')
    .replace(/[^a-zA-Z0-9_.-]/g, '_')
    .replace(/_{2,}/g, '_')
    .replace(/^\.+|\.+$/g, '')
    .substring(0, 255);
};

async function getSirvToken() {
  try {
    if (tokenCache.token && tokenCache.expiresAt && Date.now() < tokenCache.expiresAt) {
      return tokenCache.token;
    }

    const response = await fetch('https://api.sirv.com/v2/token', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        clientId: SIRV_CLIENT_ID,
        clientSecret: SIRV_CLIENT_SECRET
      })
    });

    const data = await response.json();

    if (!response.ok || !data.token) {
      throw new Error(data.message || 'Failed to get authorization token');
    }

    tokenCache = {
      token: data.token,
      expiresAt: Date.now() + ((data.expiresIn || 1200) * 1000) - 60000
    };

    return data.token;
  } catch (error) {
    console.error('Failed to get Sirv token:', error);
    throw error;
  }
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const folder = formData.get('folder') || '';
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only JPEG, PNG, GIF, WebP, and SVG images are allowed.' },
        { status: 400 }
      );
    }

    // Get Sirv token
    const token = await getSirvToken();

    // Generate a clean filename with timestamp
    const timestamp = Date.now();
    const ext = file.type.split('/')[1] === 'jpeg' ? 'jpg' : file.type.split('/')[1];
    const baseFilename = `${timestamp}.${ext}`;

    // Build the full path including folder if provided
    const fullPath = folder ? `/${folder}/${baseFilename}` : `/${baseFilename}`;
    const encodedFilename = encodeURIComponent(fullPath);

    console.log('Upload request:', {
      originalFilename: file.name,
      fullPath,
      encodedFilename,
      fileType: file.type,
      fileSize: file.size
    });

    // Construct the final URL
    const uploadUrl = `${SIRV_API_ENDPOINT}?filename=${encodedFilename}`;
    console.log('Sirv API URL:', uploadUrl);

    // Convert the file to a blob with the correct content type
    const fileArrayBuffer = await file.arrayBuffer();
    const fileBlob = new Blob([fileArrayBuffer], { type: file.type });

    // Upload to Sirv
    const uploadResponse = await fetch(uploadUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': file.type
      },
      body: fileBlob
    });

    // Handle upload response
    if (!uploadResponse.ok) {
      let errorMessage;
      try {
        const errorData = await uploadResponse.json();
        errorMessage = errorData.message || 'Unknown error';
      } catch {
        errorMessage = await uploadResponse.text();
      }

      console.error('Sirv API error:', {
        status: uploadResponse.status,
        response: errorMessage
      });

      return NextResponse.json(
        { error: `Upload failed: ${errorMessage}` },
        { status: uploadResponse.status }
      );
    }

    // Construct CDN URL (remove leading slash for CDN URL)
    const cdnPath = fullPath.substring(1); // Remove leading slash
    const cdnUrl = `https://${process.env.NEXT_PUBLIC_SIRV_DOMAIN}/${cdnPath}`;

    console.log('Upload successful:', {
      cdnUrl,
      cdnPath
    });

    return NextResponse.json({
      url: cdnUrl,
      filename: cdnPath,
      success: true
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: error.message || 'Upload failed' },
      { status: 500 }
    );
  }
}
