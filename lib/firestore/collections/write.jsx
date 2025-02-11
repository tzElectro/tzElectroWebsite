import { db } from "@/lib/firebase";
import {
  collection,
  deleteDoc,
  doc,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";

export const createNewCollection = async ({ data }) => {
  if (!data?.imageURL) {
    throw new Error("Image is required");
  }
  if (!data?.title) {
    throw new Error("Title is required");
  }
  if (!data?.products || data?.products?.length === 0) {
    throw new Error("Products are required");
  }

  const newId = doc(collection(db, 'ids')).id;

  await setDoc(doc(db, `collections/${newId}`), {
    ...data,
    id: newId,
    timestampCreate: Timestamp.now(),
  });
};

export const updateCollection = async ({ data }) => {
  if (!data?.title) {
    throw new Error("Title is required");
  }
  if (!data?.products || data?.products?.length === 0) {
    throw new Error("Products are required");
  }
  if (!data?.id) {
    throw new Error("ID is required");
  }

  await updateDoc(doc(db, `collections/${data.id}`), {
    ...data,
    timestampUpdate: Timestamp.now(),
  });
};

export const deleteCollection = async ({ id }) => {
  if (!id) {
    throw new Error("ID is required");
  }
  await deleteDoc(doc(db, `collections/${id}`));
};
