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

    const getCommentById = (id) => {
        return getToken().then((token) =>
            fetch(`${apiUrl}/GetById/${id}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((res) => res.json()));
    }


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

    const updateComment = (comment) => {
        return getToken().then((token) => {
            fetch(`${apiUrl}/${comment.id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(comment),
            })
        });
    };

    return (
        <CommentContext.Provider value={{ comments, getCommentsForPost, getCommentById, addComment, deleteComment, updateComment }}>
            {props.children}
        </CommentContext.Provider>
    );
}
