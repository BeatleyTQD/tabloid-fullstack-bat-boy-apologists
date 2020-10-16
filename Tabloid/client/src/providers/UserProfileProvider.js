import React, { useState, useEffect, createContext } from "react";
import { Spinner } from "reactstrap";
import * as firebase from "firebase/app";
import "firebase/auth";

export const UserProfileContext = createContext();

export function UserProfileProvider(props) {
  const apiUrl = "/api/userprofile";

  const userProfile = sessionStorage.getItem("userProfile");
  const [isLoggedIn, setIsLoggedIn] = useState(userProfile != null);
  const [users, setUsers] = useState([]);

  const [isFirebaseReady, setIsFirebaseReady] = useState(false);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((u) => {
      setIsFirebaseReady(true);
    });
  }, []);

  const login = (email, pw) => {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, pw)
      .then((signInResponse) => getUserProfile(signInResponse.user.uid))
      .then((userProfile) => {
        if(userProfile.userType.name.toLowerCase() === "admin")
        {
          userProfile.userType.name = "10g03kd03212d3213d213d123cvb"
        }
        
       
        sessionStorage.setItem("userProfile", JSON.stringify(userProfile));
       
        setIsLoggedIn(true);
      });
  };

  const logout = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        sessionStorage.clear();
        setIsLoggedIn(false);
      });
  };

  const register = (userProfile, password) => {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(userProfile.email, password)
      .then((createResponse) =>
        saveRegisterUser({ ...userProfile, firebaseUserId: createResponse.user.uid })
      )
      .then((savedUserProfile) => {
        
        sessionStorage.setItem("userProfile", JSON.stringify(savedUserProfile));
        setIsLoggedIn(true);
      });
  };

  const getToken = () => firebase.auth().currentUser.getIdToken();

  const getUserProfile = (firebaseUserId) => {
    return getToken().then((token) =>
      fetch(`${apiUrl}/${firebaseUserId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((resp) => resp.json())
    );
  };

  const saveRegisterUser = (userProfile) => {
    return getToken().then((token) =>
      fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userProfile)
      }).then(resp => resp.json()));
  };

  const saveUser = (userProfile) => {
    return getToken().then((token) =>
      fetch(`${apiUrl}/edittype`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userProfile),
      }).then(function (response) {
        if (!response.ok) {
          return false;
        }

        return response.ok;

      })
    );
  };

  const deactivateUserProfile = (id) => {
    return getToken().then((token) =>
      fetch(`${apiUrl}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        }
      }).then(function (response) {
        if (!response.ok) {
          return false;
        }

        return response.ok;

      })
    );
  };

  const reactivateUserProfile = (id) => {
    return getToken().then((token) =>
      fetch(`${apiUrl}/reactivate/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        }
      }).then(function (response) {
        if (!response.ok) {
          return false;
        }

        return response.ok;

      })
    );
  };

  const getAllUsers = () =>
    getToken().then((token) =>
      fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => resp.json())
        .then(setUsers)
    );


  const getDeactivatedUsers = () =>
    getToken().then((token) =>
      fetch(`${apiUrl}/deactivated`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => resp.json())
        .then(setUsers)
    );

  const getUserById = (id) =>
    getToken().then((token) =>
      fetch(`${apiUrl}/details/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((resp) => resp.json())
    );

  return (
    <UserProfileContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        deactivateUserProfile,
        register,
        getToken,
        users,
        getAllUsers,
        getUserById,
        getDeactivatedUsers,
        reactivateUserProfile,
        saveUser,
        saveRegisterUser
      }}
    >
      {isFirebaseReady ? (
        props.children
      ) : (
          <Spinner className="app-spinner dark" />
        )}
    </UserProfileContext.Provider>
  );
}
