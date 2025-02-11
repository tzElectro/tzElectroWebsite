import { db } from "@/lib/firebase";
import {
  collection,
  deleteDoc,
  doc,
  setDoc,
  Timestamp,
} from "firebase/firestore";

// Comment out Firebase Storage imports as we're using Sirv
// import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const createNewProduct = async ({ data, featureImage, imageList }) => {
  if (!data?.title) {
    throw new Error("Title is required");
  }
  if (!featureImage) {
    throw new Error("Feature Image is required");
  }

  const newId = doc(collection(db, `ids`)).id;

  await setDoc(doc(db, `products/${newId}`), {
    ...data,
    id: newId,
    featureImageURL: featureImage,
    imageList: imageList || [],
    timestampCreate: Timestamp.now(),
  });

  return newId;
};

export const updateProduct = async ({ data, featureImage, imageList }) => {
  if (!data?.title) {
    throw new Error("Title is required");
  }
  if (!data?.id) {
    throw new Error("ID is required");
  }

  const featureImageURL = featureImage || data?.featureImageURL;
  const finalImageList = imageList || data?.imageList || [];

  await setDoc(doc(db, `products/${data?.id}`), {
    ...data,
    featureImageURL: featureImageURL,
    imageList: finalImageList,
    timestampUpdate: Timestamp.now(),
  });
};

export const deleteProduct = async ({ id }) => {
  if (!id) {
    throw new Error("ID is required");
  }
  await deleteDoc(doc(db, `products/${id}`));
};
