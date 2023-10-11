import { useEffect, useState } from "react";
import {
  query,
  collection,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { useGetUserInfo } from "./useGetUserInfo";

export const useGetTransactions = () => {
  // Initialize state variables for transactions and transaction totals
  const [transactions, setTransactions] = useState([]);
  const [transactionTotals, setTransactionTotals] = useState({
    balance: 0.0,
    income: 0.0,
    expenses: 0.0,
  });

  // Get a reference to the "transactions" collection in Firestore
  const transactionCollectionRef = collection(db, "transactions");

  // Get the user ID using the useGetUserInfo hook
  const { userID } = useGetUserInfo();

  useEffect(() => {
    const getTransactions = async () => {
      let unsubscribe;
      try {
        // Create a Firestore query to retrieve user-specific transactions ordered by creation date
        const queryTransactions = query(
          transactionCollectionRef,
          where("userID", "==", userID),
          orderBy("createdAt")
        );

        // Subscribe to changes in the Firestore query results
        unsubscribe = onSnapshot(queryTransactions, (snapshot) => {
          let docs = [];
          let totalIncome = 0;
          let totalExpenses = 0;

          snapshot.forEach((doc) => {
            const data = doc.data();
            const id = doc.id;

            docs.push({ ...data, id });

            // Calculate total income and expenses based on transaction type
            if (data.transactionType === "expense") {
              totalExpenses += Number(data.transactionAmount);
            } else {
              totalIncome += Number(data.transactionAmount);
            }

            
          });

          // Set the retrieved transactions and update transaction totals
          setTransactions(docs);

          let balance = totalIncome - totalExpenses;
          setTransactionTotals({
            balance,
            expenses: totalExpenses,
            income: totalIncome,
          });
        });
      } catch (err) {
        console.error(err);
      }

      // Unsubscribe from Firestore updates when the component unmounts
      return () => unsubscribe();
    };

    // Call the function to fetch transactions when the component mounts or when userID changes
    getTransactions();
  }, [transactionCollectionRef, userID]);

  // Return the fetched transactions and transaction totals
  return { transactions, transactionTotals };
};
