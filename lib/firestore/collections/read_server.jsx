import { db } from "@/lib/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

export const getCollection = async ({ id }) => {
  if (!id) return null; // Prevent errors if id is undefined
  
  const docRef = doc(db, "collections", id);
  const data = await getDoc(docRef);

  if (data.exists()) {
    return { id: data.id, ...data.data() }; // Include the document ID
  } else {
    return null;
  }
};

export const getCollections = async () => {
  const list = await getDocs(collection(db, "collections"));
  return list.docs.map((snap) => ({
    id: snap.id,
    ...snap.data(),
  }));
};