import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase";
import { useGetUserInfo } from "./useGetUserInfo";

export const useAddTransaction = () => {
  // Get a reference to the "transactions" collection in Firestore
  const transactionCollectionRef = collection(db, "transactions");

  // Get the user ID using the useGetUserInfo hook
  const { userID } = useGetUserInfo();

   // Function to add a transaction to Firestore
  const addTransaction = async ({
    description,
    transactionAmount,
    transactionType,
  }) => {
    // Add a new document to the "transactions" collection with user-specific data
    await addDoc(transactionCollectionRef, {
      userID,
      description,
      transactionAmount,
      transactionType,
      createdAt: serverTimestamp(),
    });
  };

  // Return the addTransaction function to be used in components
  return { addTransaction };
};
