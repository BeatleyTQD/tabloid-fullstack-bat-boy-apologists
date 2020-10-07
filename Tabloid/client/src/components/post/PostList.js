import React, { useContext, useEffect } from "react";
import { PostContext } from "../../providers/PostProvider";
import PostCard from "./PostCard"

const PostList = () => {
    const { posts, getAllPosts } = useContext(PostContext);

    useEffect(() => {
        getAllPosts();
    }, []);

    return (
        <div className="container pt-5">
            <h1>Posts</h1>
            <p>
                <a class="btn btn-primary">New Post</a>
            </p>
            <table class="table table-striped">
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
                    </tr>
                </thead>
                <tbody>
                    {posts.map((post) => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PostList;