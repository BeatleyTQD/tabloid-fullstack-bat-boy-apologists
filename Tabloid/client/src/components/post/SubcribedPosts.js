import React, { useContext, useEffect } from "react";
import { PostContext } from "../../providers/PostProvider";
import Post from "./Post"
import { Link } from "react-router-dom";

const SubscribedPosts = () => {
    const { posts, getSubscribedPosts } = useContext(PostContext);

    useEffect(() => {
        getSubscribedPosts();
    }, []);

    return (
        <div className="container">
            <h1>My Posts</h1>
            <p>
                <Link to={`/post/add`} className="btn btn-primary" title="New Post">New Post</Link>
            </p>
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