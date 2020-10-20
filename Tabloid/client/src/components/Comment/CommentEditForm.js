import React, { useContext, useEffect, useState } from 'react';
import { CommentContext } from "../../providers/CommentProvider";
import { useHistory, useParams } from "react-router-dom";
import { Button } from "reactstrap";


const CommentEditForm = () => {
    const [comment, setComment] = useState();
    const { getCommentById, updateComment, getCommentsForPost } = useContext(CommentContext);
    const { id } = useParams();
    const history = useHistory();


    useEffect(() => {
        getCommentById(id)
            .then(setComment);
    }, [])

    const handleFieldChange = evt => {
        const stateToChange = { ...comment };
        stateToChange[evt.target.id] = evt.target.value;
        setComment(stateToChange);
    };

    const Update = () => {
        const editedComment = {
            id: parseInt(id),
            subject: comment.subject,
            content: comment.content
        };
        updateComment(editedComment)
            .then(() => history.push(`/post/${comment.postId}/comments`))
            .then(getCommentsForPost(comment.postId));
    }

    const Cancel = () => {
        history.push(`/post/${comment.postId}/comments`)
    }

    if (!comment) {
        return null;
    }


    return (
        <>
            <>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="card col-md-12 col-lg-8">
                            <h3 className="mt-3 text-primary text-center card-title">What do you have to say?</h3>
                            <div className="form-group">
                                <label htmlFor="subject" className="control-label">Subject</label>
                                <input className="form-control" id="subject" value={comment.subject} onChange={handleFieldChange} />

                                <label htmlFor="content" className="control-label">Content</label>
                                <input className="form-control" id="content" value={comment.content} onChange={handleFieldChange} />
                            </div>
                            <div>
                                <Button color="primary" onClick={Update}>Update Comment</Button>{" "}
                                <Button color="secondary" onClick={Cancel}>Cancel</Button>{" "}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </>
    )
};

export default CommentEditForm;