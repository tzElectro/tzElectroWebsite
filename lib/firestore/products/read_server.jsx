import { db } from "@/lib/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";

export const getProduct = async ({ id }) => {
  try {
    const data = await getDoc(doc(db, `products/${id}`));
    if (data.exists()) {
      return data.data();
    }
    return null;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw new Error("Failed to fetch product");
  }
};

export const getFeaturedProducts = async () => {
  try {
    const list = await getDocs(
      query(collection(db, "products"), where("isFeatured", "==", true))
    );
    return list.docs.map((snap) => snap.data());
  } catch (error) {
    console.error("Error fetching featured products:", error);
    return [];
  }
};

export const getProducts = async () => {
  try {
    const list = await getDocs(
      query(collection(db, "products"), orderBy("timestampCreate", "desc"))
    );
    return list.docs.map((snap) => snap.data());
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const getProductsByCategory = async ({ categoryId }) => {
  try {
    if (!categoryId) {
      throw new Error("Category ID is required");
    }

    // First check if the index exists by making a small query
    const testQuery = query(
      collection(db, "products"),
      where("categoryId", "==", categoryId),
      orderBy("timestampCreate", "desc"),
      // Limit to 1 to test if index exists
      limit(1)
    );

    await getDocs(testQuery);

    // If we get here, index exists, now get all products
    const list = await getDocs(
      query(
        collection(db, "products"),
        where("categoryId", "==", categoryId),
        orderBy("timestampCreate", "desc")
      )
    );
    
    return list.docs.map((snap) => snap.data());
  } catch (error) {
    console.error("Error fetching products by category:", error);
    if (error.code === "failed-precondition") {
      throw new Error(
        "This query requires a database index. Please create the index or try again in a few minutes if you just created it."
      );
    }
    return [];
  }
};
