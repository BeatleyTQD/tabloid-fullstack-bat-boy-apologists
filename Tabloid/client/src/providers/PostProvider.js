import React, { useState, createContext, useEffect, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const PostContext = createContext();

export const PostProvider = (props) => {
    const [posts, setPosts] = useState([]);
    const [subscriptions, setSubscriptions ] = useState([]);
    const { getToken } = useContext(UserProfileContext);

    const apiUrl = "/api/post";
    const subscrApiUrl = "/api/subscription";


    const addSubscription = (subscription) => {
        return getToken().then((token) =>
            fetch(subscrApiUrl, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(subscription)
            }).then(function (response) {
                if (!response.ok) {
                  return false;
                }
        
                return response.json;
        
              })
    )};

    const unsubscribe = (subscription) => {
        return getToken().then((token) =>
            fetch(`${subscrApiUrl}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(subscription),
            })
        );
    };

    const getSubscriptions = () => {
        return getToken().then((token) =>
            fetch(subscrApiUrl, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json())
                .then(setSubscriptions));
    }

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

    const getSubscribedPosts = () => {
        return getToken().then((token) =>
            fetch(`${apiUrl}/subscribed`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json())
                .then(setPosts))
    }

    const getMyPosts = () => {
        return getToken().then((token) =>
            fetch(`${apiUrl}/myposts`, {
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
    };

    const deletePost = (id) => {
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
        <PostContext.Provider value={{ posts, subscriptions, getAllPosts, getSubscribedPosts, addPost, getPost, updatePost, deletePost, getMyPosts, getSubscriptions, addSubscription, unsubscribe }}>
            {props.children}
        </PostContext.Provider>
    );
};