import React, { useContext, useEffect } from "react";
import { PostContext } from "../../providers/PostProvider";
import Post from "./Post"


const SubscribedPosts = () => {
    const { posts, getSubscribedPosts } = useContext(PostContext);

    useEffect(() => {
        getSubscribedPosts();
    }, []);

    return (
        <div className="container">
            <h1>Subscribed Posts</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>
                            Title
                        </th>
                        <th>
                            Author
                        </th>
                        <th>
                            Category
                        </th>
                        <th>
                            Published
                        </th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map((post) => (
                        <Post key={post.id} post={post} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SubscribedPosts;