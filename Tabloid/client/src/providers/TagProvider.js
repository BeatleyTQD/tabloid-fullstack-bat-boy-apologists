import React, { useState, createContext, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const TagContext = createContext();

export const TagProvider = (props) => {
  const [tags, setTags] = useState([]);
  const { getToken } = useContext(UserProfileContext);
  const apiUrl = "/api/tag";

  const getAllTags = () =>
    getToken().then((token) =>
      fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => resp.json())
        .then(setTags)
    );

  return (
    <TagContext.Provider value={{ tags, getAllTags }}>
      {props.children}
    </TagContext.Provider>
  );
};
