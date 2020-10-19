import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { CommentContext } from "../../providers/CommentProvider";
import { Button } from "reactstrap";

const CommentForm = (props) => {
    const { addComment } = useContext(CommentContext);
    const [comment, setComment] = useState({ subject: "", content: "", createDateTime: "", userProfileId: 0, postId: 0 })
    const history = useHistory();
    const { id } = useParams();
    const currentUser = JSON.parse(sessionStorage.userProfile);


    const handleFieldChange = evt => {
        const stateToChange = comment;
        stateToChange[evt.target.id] = evt.target.value;
        setComment(stateToChange);
    };

    const saveComment = () => {
        comment.postId = parseInt(id);
        comment.createDateTime = new Date
        comment.userProfileId = currentUser.id;
        addComment(comment)
            .then(() => history.push(`/post/${id}/comments`));
    }

    return (
        <>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="card col-md-12 col-lg-8">
                        <h3 className="mt-3 text-primary text-center card-title">What do you have to say?</h3>
                        <div className="form-group">
                            <label htmlFor="subject" className="control-label">Subject</label>
                            <input className="form-control" id="subject" onChange={handleFieldChange} />

                            <label htmlFor="content" className="control-label">Content</label>
                            <input className="form-control" id="content" onChange={handleFieldChange} />
                        </div>
                        <div>
                            <Button color="primary" onClick={saveComment}>Post Comment</Button>{" "}

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default CommentForm;