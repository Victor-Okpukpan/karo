export const useGetUserInfo = () => {
    // Retrieve user information from local storage or initialize to empty values
    const { name, profilePhoto, userID, isAuth } =
      JSON.parse(localStorage.getItem("auth")) || {};
  
    // Return the user information as an object
    return { name, profilePhoto, userID, isAuth };
  };
  