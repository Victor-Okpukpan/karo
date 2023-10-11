import { useState } from "react";
import { signOut } from "firebase/auth";
import { useAddTransaction } from "../../hooks/useAddTransaction";
import { useGetTransactions } from "../../hooks/useGetTransactions";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import { Navigate, useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

import "./styles.css";
import { auth } from "../../config/firebase";
import Header from "../../components/header/Header";

export default function ExpenseTrackerPage() {
  // Custom hooks for managing transactions and user information
  const { addTransaction } = useAddTransaction();
  const { transactions, transactionTotals } = useGetTransactions();
  const { name, profilePhoto, isAuth } = useGetUserInfo();
  const navigate = useNavigate();

  // State variables for transaction input fields
  const [description, setDescription] = useState("");
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [transactionType, setTransactionType] = useState("expense");

  const { balance, income, expenses } = transactionTotals;

  // Function to handle form submission
  const onSubmit = (e) => {
    e.preventDefault();

    const notification = toast.loading(`Your ${transactionType} is being added...`)
    // Call addTransaction function with form values
    addTransaction({
      description,
      transactionAmount,
      transactionType,
    });

    toast.success(`Your ${transactionType} has been added`, {
      id: notification
    })

    // Clear form input fields after submission
    setDescription("");
    setTransactionAmount("");
  };

  // Function to sign the user out
  const signUserOut = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      // Navigate back to the home page after sign out
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  if (!isAuth) return <Navigate to="/" />;

  return (
    <div className="main">
      <Header />
      <div className="expense-tracker">
        <div className="container">
          <h1> {name}&apos;s Expense Tracker</h1>
          <div className="inner-wrapper">
          <div className="balance">
            <h3> Your Balance</h3>
            {/* Display balance with currency symbol */}
            {balance >= 0 ? (
              <h2> &#8358;{balance.toLocaleString()}</h2>
            ) : (
              <h2> -&#8358;{balance.toLocaleString() * -1}</h2>
            )}
          </div>
          <div className="summary">
            <div className="income">
              <h3> Income</h3>
              {/* Display income amount with currency symbol */}
              <h2>&#8358;{income.toLocaleString()}</h2>
            </div>
            <div className="expenses">
              <h3> Expenses</h3>
              {/* Display expenses amount with currency symbol */}
              <h2>&#8358;{expenses.toLocaleString()}</h2>
            </div>
          </div>
          </div>

          <form className="add-transaction" onSubmit={onSubmit}>
            <div className="input-wrapper">
              {/* Input fields for transaction description and amount */}
              <input
                type="text"
                placeholder="Description"
                value={description}
                required
                onChange={(e) => setDescription(e.target.value)}
              />
              <input
                type="number"
                placeholder="Amount"
                value={transactionAmount}
                required
                onChange={(e) => setTransactionAmount(e.target.value)}
              />
            </div>
            <div className="radio-wrapper">
              {/* Radio buttons for transaction type (income/expense) */}
              <input
                type="radio"
                id="expense"
                value="expense"
                checked={transactionType === "expense"}
                onChange={(e) => setTransactionType(e.target.value)}
              />
              <label htmlFor="expense"> Expense</label>
              <input
                type="radio"
                id="income"
                value="income"
                checked={transactionType === "income"}
                onChange={(e) => setTransactionType(e.target.value)}
              />
              <label htmlFor="income"> Income</label>
            </div>
            <button type="submit"> Add Transaction</button>
          </form>
        </div>
        {/* Display user profile photo and sign out button */}
        {profilePhoto && (
          <div className="profile">
            {" "}
            <img className="profile-photo" src={profilePhoto} alt={name} />
            <button className="sign-out-button" onClick={signUserOut}>
              Sign Out
            </button>
          </div>
        )}
      </div>
      <div className="transactions">
        <h3>Transactions</h3>
        <ul>
          {/* Display transaction history */}
          {transactions.map((transaction, index) => {
            const { description, transactionAmount, transactionType } =
              transaction;
            return (
              <li key={index}>
                <h4 style={{textTransform: "capitalize"}}> {description} </h4>
                <p>
                  {/* Display transaction amount with currency symbol */}
                  &#8358;{transactionAmount} •{" "}
                  <label
                    style={{
                      color: transactionType === "expense" ? "red" : "green",
                    }}
                  >
                    {" "}
                    {transactionType}{" "}
                  </label>
                </p>
              </li>
            );
          })}
        </ul>
      </div>
      <Toaster position="top-right"/>
    </div>
  );
}
