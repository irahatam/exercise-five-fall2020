import React, { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Redirect } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";

// Styles
import "./App.css";

// Pages
import Login from "./containers/Login.js";
import CreateAccount from "./containers/CreateAccount.js";
import UserProfile from "./containers/UserProfile.js";

// Components
import Header from "./components/Header.js";

// Firebase Config
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "exercise-five-fall-2020-83b05.firebaseapp.com",
  projectId: "exercise-five-fall-2020-83b05",
  storageBucket: "exercise-five-fall-2020-83b05.appspot.com",
  messagingSenderId: "331965713831",
  appId: "1:331965713831:web:32b97cff8a3eade72afa82",
};

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  // const [userInformation, setUserInformation] = useState({});

  // Ensure app is initialized when it's ready
  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  }, [firebaseConfig]);

  // Function for logging in
  function LoginFunction(e) {
    // This is what you will run when you want to log in
    e.preventDefault();

    const email = e.currentTarget.loginEmail.value;
    const password = e.currentTarget.loginPassword.value;

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(function (response) {
        console.log("LOGIN RESPONSE", response);
        setLoggedIn(true);
      })
      .catch(function (error) {
        console.log("LOGIN ERROR", error);
      });
  }

  // Function for logging out
  function LogoutFunction() {
    // This is what you will run when you want to log out
  }

  // Function for creating an account
  function CreateAccountFunction(e) {
    // This is what you will run when you want to create an account
    e.preventDefault();
    const email = e.currentTarget.createEmail.value;
    const password = e.currentTarget.createPassword.value;

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(function (response) {
        console.log("VALID ACCOUNT CREATED FOR:", email, response);
        setLoggedIn(true);
      })
      .catch(function (error) {
        console.log("ACCOUNT CREATION FAILED", error);
      });
  }

  return (
    <div className="App">
      <Header loggedIn={loggedIn} LogoutFunction={LogoutFunction} />
      <Router>
        <Route exact path="/login">
          <Login LoginFunction={LoginFunction} />
        </Route>

        <Route exact path="/create-account">
          <CreateAccount CreateAccountFunction={CreateAccountFunction} />
        </Route>

        <Route exact path="/">
          <UserProfile />
        </Route>
      </Router>
    </div>
  );
}

export default App;
