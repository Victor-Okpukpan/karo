import { auth, provider } from "../../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate, Navigate } from "react-router-dom";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import "./styles.css";

export default function AuthenticationPage() {
  // Initialize navigation and check if the user is authenticated
  const navigate = useNavigate();
  const { isAuth } = useGetUserInfo();

  // Function to sign in with Google
  const signInWithGoogle = async () => {
    // Sign in using Google authentication provider
    const results = await signInWithPopup(auth, provider);

    // Prepare user authentication information
    const authInfo = {
      userID: results.user.uid,
      name: results.user.displayName,
      profilePhoto: results.user.photoURL,
      isAuth: true,
    };

    // Store authentication info in local storage
    localStorage.setItem("auth", JSON.stringify(authInfo));

    // Redirect to the expense tracker page after successful sign-in
    navigate("/expense-tracker");
  };

  // If the user is already authenticated, redirect to the expense tracker page
  if (isAuth) return <Navigate to="/expense-tracker" />;

  // Render the login page with Google sign-in option
  return (
    <div className="login-page">
      <h1>Welcome to BudgetTracker</h1>
      <p>Your Trusty Budgeting Companion</p>
      <button className="login-with-google-btn" onClick={signInWithGoogle}>
        {" "}
        Sign In With Google
      </button>
    </div>
  );
}
