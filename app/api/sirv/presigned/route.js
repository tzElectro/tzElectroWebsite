import { getSirvToken } from '@/lib/sirv.config';

export async function POST(request) {
  try {
    // Log incoming request
    console.log('Received presigned URL request');
    
    // Parse request body
    const body = await request.json();
    const { filename, folder } = body;
    
    console.log('Request params:', { filename, folder });

    if (!filename) {
      return Response.json(
        { error: 'Filename is required' },
        { status: 400 }
      );
    }

    // Get Sirv token
    console.log('Getting Sirv token...');
    const token = await getSirvToken();
    console.log('Got Sirv token');

    // Generate clean filename and folder
    const cleanFolder = folder
      ? folder.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-+|-+$/g, '')
      : '';
    
    const timestamp = Date.now().toString().slice(-6);
    const ext = filename.split('.').pop().toLowerCase();
    const cleanFilename = `file${timestamp}.${ext}`;

    console.log('Clean paths:', { cleanFilename, cleanFolder });

    // Build the URL with proper encoding
    const queryParams = new URLSearchParams();
    queryParams.append('filename', cleanFilename);
    if (cleanFolder) {
      queryParams.append('folder', cleanFolder);
    }

    // Get pre-signed URL from Sirv
    console.log('Requesting presigned URL from Sirv...');
    const sirvUrl = `https://api.sirv.com/v2/files/upload/presigned?${queryParams.toString()}`;
    console.log('Sirv URL:', sirvUrl);

    const response = await fetch(sirvUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    const responseText = await response.text();
    console.log('Sirv response:', response.status, responseText);

    if (!response.ok) {
      return Response.json(
        { error: `Sirv API error: ${responseText}` },
        { status: response.status }
      );
    }

    let data;
    try {
      data = JSON.parse(responseText);
    } catch (e) {
      return Response.json(
        { error: 'Invalid JSON response from Sirv' },
        { status: 500 }
      );
    }

    console.log('Successfully got presigned URL');
    return Response.json({
      presignedUrl: data.uploadUrl,
      filename: cleanFilename,
      folder: cleanFolder
    });
  } catch (error) {
    // Log the full error
    console.error('Pre-signed URL error:', {
      message: error.message,
      stack: error.stack,
      cause: error.cause
    });

    return Response.json(
      { error: error.message || 'Failed to generate pre-signed URL' },
      { status: 500 }
    );
  }
}
