import React, { useState, useEffect, createContext } from "react";
import { Spinner } from "reactstrap";
import * as firebase from "firebase/app";
import "firebase/auth";

export const UserTypeContext = createContext();

export function UserTypeProvider(props) {
  const apiUrl = "/api/usertype";

  const [userTypes, setUserTypes] = useState([]);

  const [isFirebaseReady, setIsFirebaseReady] = useState(false);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((u) => {
      setIsFirebaseReady(true);
    });
  }, []);

  

  const getToken = () => firebase.auth().currentUser.getIdToken();

  

  const getAllUserTypes = () =>
    getToken().then((token) =>
      fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => resp.json())
        .then(setUserTypes)
    );


    

  return (
    <UserTypeContext.Provider
      value={{
       
       getAllUserTypes,
       userTypes
      }}
    >
      {isFirebaseReady ? (
        props.children
      ) : (
        <Spinner className="app-spinner dark" />
      )}
    </UserTypeContext.Provider>
  );
}
