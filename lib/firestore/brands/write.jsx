import { db } from "@/lib/firebase";
import {
  collection,
  deleteDoc,
  doc,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";

export const createNewBrand = async ({ data, image }) => {
  if (!image) {
    throw new Error("Image is Required");
  }
  if (!data?.name) {
    throw new Error("Name is required");
  }

  const newId = doc(collection(db, `ids`)).id;

  await setDoc(doc(db, `brands/${newId}`), {
    ...data,
    id: newId,
    imageURL: image, // image is now a Sirv URL
    timestampCreate: Timestamp.now(),
  });
};

export const updateBrand = async ({ data, image }) => {
  if (!data?.name) {
    throw new Error("Name is required");
  }
  if (!data?.id) {
    throw new Error("ID is required");
  }
  const id = data?.id;

  // Use new image URL if provided, otherwise keep existing
  const imageURL = image || data?.imageURL;

  await updateDoc(doc(db, `brands/${id}`), {
    ...data,
    imageURL: imageURL,
    timestampUpdate: Timestamp.now(),
  });
};

export const deleteBrand = async ({ id }) => {
  if (!id) {
    throw new Error("ID is required");
  }
  await deleteDoc(doc(db, `brands/${id}`));
};
