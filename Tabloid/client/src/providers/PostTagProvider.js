import React, { useState, createContext, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const PostTagContext = createContext();

export const PostTagProvider = (props) => {
  const [postTags, setPostTags] = useState([]);
  const { getToken } = useContext(UserProfileContext);
  const apiUrl = "/api/posttag";

  

  const getTagsByPostId = (id) =>
    getToken().then((token) =>
      fetch(`${apiUrl}/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => res.json()))
        .then(setPostTags);

  const addPostTag = (postTag) => {
    return getToken().then((token) =>
      fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postTag),
      }));
  };

  
  const deleteTagsByPostId = (id) => {
    return getToken().then((token) => {
      fetch(`${apiUrl}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
    })
  };

  return (
    <PostTagContext.Provider value={{ postTags, getTagsByPostId, addPostTag, deleteTagsByPostId }}>
      {props.children}
    </PostTagContext.Provider>
  );
};
