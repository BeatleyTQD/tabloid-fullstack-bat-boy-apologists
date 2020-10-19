import React, { useState, useContext, createContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const CommentContext = createContext();

export const CommentProvider = (props) => {
    const [comments, setComments] = useState([]);
    const { getToken } = useContext(UserProfileContext);
    const apiUrl = "/api/comment"

    const getCommentsForPost = (id) => {
        return getToken().then((token) =>
            fetch(`${apiUrl}/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }).then((res) => res.json())
                .then(setComments)
        );
    };

    const addComment = (comment) => {
        return getToken().then((token) =>
            fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(comment)
            }));
    };

    const deleteComment = (id) => {
        return getToken().then((token) => {
            fetch(`${apiUrl}/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })
        })
    };

    return (
        <CommentContext.Provider value={{ comments, getCommentsForPost, addComment, deleteComment }}>
            {props.children}
        </CommentContext.Provider>
    );
}
