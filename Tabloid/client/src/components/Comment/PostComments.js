import React, { useState, useContext, useEffect } from "react";
import { CommentContext } from "../../providers/CommentProvider";
import Comment from './Comment';
import { useParams } from 'react-router-dom';


export default function PostComments() {
    const [comments, setComments] = useState([]);
    const { getCommentsForPost } = useContext(CommentContext);
    const { id } = useParams();

    useEffect(() => {
        const intId = parseInt(id)
        getCommentsForPost(intId).then(setComments);
    }, []);

    if (!comments) {
        return null;
    }
    return (
        <>
            <div className="container pt-5">
                <h1>Post Title</h1>
                {comments.map((comment) => (
                    <Comment key={comment.id} comment={comment} />
                ))}
            </div>
        </>
    )
}