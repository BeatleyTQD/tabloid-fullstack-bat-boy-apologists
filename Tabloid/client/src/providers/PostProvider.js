import React, { useState, createContext, useEffect, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const PostContext = createContext();

export const PostProvider = (props) => {
    const [posts, setPosts] = useState([]);
    const { getToken } = useContext(UserProfileContext);

    const apiUrl = "/api/post";

    const getAllPosts = () => {
        return getToken().then((token) =>
            fetch(apiUrl, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json())
                .then(setPosts));
    };

    const getPost = (id) => {
        return getToken().then((token) =>
            fetch(`${apiUrl}/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json()));
    };

    const addPost = (post) => {
        return getToken().then((token) =>
            fetch(apiUrl, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(post)
            }).then(resp => resp.json()));
    };

    const updatePost = (post) => {
        return getToken().then((token) =>
            fetch(`${apiUrl}/${post.id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(post),
            })
        );
    }

    return (
        <PostContext.Provider value={{ posts, getAllPosts, addPost, getPost, updatePost }}>
            {props.children}
        </PostContext.Provider>
    );
};