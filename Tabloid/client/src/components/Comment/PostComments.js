import React, { useState, useContext, useEffect } from "react";
import { CommentContext } from "../../providers/CommentProvider";
import { PostContext } from "../../providers/PostProvider";
import Comment from './Comment';
import { useParams, useHistory } from 'react-router-dom';
import { Button } from 'reactstrap';

export default function PostComments() {
    const [post, setPost] = useState();
    const { getCommentsForPost, comments } = useContext(CommentContext);
    const { getPost } = useContext(PostContext);
    const history = useHistory();

    const { id } = useParams();

    useEffect(() => {
        const intId = parseInt(id)
        getCommentsForPost(intId);
        getPost(intId).then(setPost);
    }, []);

    const GoBack = () => {
        history.push(`/post/${id}`)
    }
    const AddComment = () => {
        history.push(`/post/${id}/addcomment`)
    }

    if (!comments || !post) {
        return null;
    }
    return (
        <>
            <div className="container">
                <h1 className="text-secondary">{post.title} <Button color="info" onClick={AddComment}>Add Comment</Button></h1>
                <br />
                {comments.map((comment) => (
                    <Comment key={comment.id} comment={comment} />
                ))}
                <Button color="secondary" onClick={GoBack}>Go Back</Button>
            </div>
        </>
    )
}