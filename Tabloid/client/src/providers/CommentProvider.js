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
        );
    };

    return (
        <CommentContext.Provider value={{ comments, getCommentsForPost }}>
            {props.children}
        </CommentContext.Provider>
    );
}
