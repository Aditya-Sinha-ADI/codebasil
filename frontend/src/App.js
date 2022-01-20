import Navigation from "./navigation/Navigation";
import Header from "./Header/Header";
import React, { useState, useEffect } from "react";
import AuthContext from "./Auth-Context/Auth";
import Login from "./Login/Login";
import Signup from "./Sign-Up/Signup";
import { loginAction, signUpAction } from "./actions/userActions";
import Following from "./Following/Following";
import Data from "./Data/Data";

function App() {
  const [personalData, setPersonalData] = useState({});

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const [following, setFollowing] = useState(false);

  const [codeChefData, setCodeChefData] = useState({
    user: {
      _id: "61d6ecd8863ff15089d86bcf",
      name: "Ujjwal1",
      email: "example@example.com",
      codechefUsername: "abhishek_987",
      following: [],
      __v: 51,
    },
    codechefData: {
      username: "Loading...",
      profession: "Loading...",
      institution: "Loading....",
      location: "Loading...",
      stars: "Loading...",
      recentActivities: ["Loading..."],
    },
  });

  useEffect(() => {
    const storedLoginInfo = localStorage.getItem("isLoggedIn");
    if (storedLoginInfo === "1") {
      setIsLoggedIn(true);
    }
  }, []);

  const ccfDataLoader = (data) => {
    setCodeChefData(data);
  };

  const loginHandler = async (email, password) => {
    console.log(email, password);
    const afterLoginData = await loginAction(email, password);

    if (afterLoginData.user) {
      setPersonalData(afterLoginData);
      setIsLoggedIn(true);
      setSignUp(false);
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    setSignUp(false);
  };

  const followingClickHandler = (set) => {
    setFollowing(set);
  };

  const signupHandler = async (email, password, name, codechefId) => {
    // console.log(email, password, name, codechefId);
    const afterLoginData = await signUpAction(
      email,
      password,
      name,
      codechefId
    );
    console.log(afterLoginData);
    if (afterLoginData.user) {
      setPersonalData(afterLoginData);
      setIsLoggedIn(true);
      setSignUp(false);
    }
  };

  const directToSignup = () => {
    setIsLoggedIn(true);
    setSignUp(true);
  };

  return (
    <div>
      <AuthContext.Provider value={{ isloggedIn: isLoggedIn }}>
        {!isLoggedIn && !signUp && (
          <Login onLogin={loginHandler} onSignup={directToSignup} />
        )}
        {isLoggedIn && !signUp && (
          <Navigation onClickFollowing={followingClickHandler} />
        )}
        {isLoggedIn && !signUp && (
          <Header
            onLogout={logoutHandler}
            userData={personalData}
            ccfDataLoader={ccfDataLoader}
          />
        )}
        {isLoggedIn && !signUp && <Following followingClicked={following} />}
        {isLoggedIn && !signUp && <Data data={codeChefData} />}

        {isLoggedIn && signUp && <Signup onSubmit={signupHandler} />}
      </AuthContext.Provider>
    </div>
  );
}

export default App;
