import React, { useContext, useState } from 'react';
import { CommentContext } from "../../providers/CommentProvider";
import { Button, Modal, ModalHeader, ModalFooter } from "reactstrap";
import { useHistory } from 'react-router-dom';


export default function Comment({ comment }) {
    const { deleteComment, getCommentsForPost } = useContext(CommentContext);
    const currentUser = JSON.parse(sessionStorage.userProfile)
    const currentUserId = currentUser.id
    const history = useHistory();
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const deleteAndRefresh = () => {
        return Promise.all([deleteComment(comment.id), getCommentsForPost(comment.postId)])
    }

    const Delete = () => {
        deleteAndRefresh();
    }

    const Edit = () => {
        history.push(`/comment/${comment.id}/edit`)
    }

    //Checks to see if comment was written by current user. If so, displays options to edit and delete the comment.
    let userCheck;
    if (comment.userProfileId === currentUserId || sessionStorage.getItem("userProfile").search('"name":"10g03kd03212d3213d213d123cvb"') !== -1) {
        userCheck =
            <>
               {comment.userProfileId === currentUserId ? <Button color="warning" onClick={Edit}>Edit</Button> : null}
                <Button color="danger" onClick={toggle} >Delete</Button>{" "}
                <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle}>Are you sure you want to delete?</ModalHeader>
                    <ModalFooter>
                        <Button color="danger" onClick={Delete}>Delete</Button>{' '}
                        <Button color="secondary" onClick={toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </>
    }

    return (
        <>
            <div>
                <h5 className="text-primary">{comment.subject}</h5>
                <p>{comment.content}</p>
                <span>{comment.user.displayName}</span>
                <p className="text-secondary">{new Intl.DateTimeFormat('en-US').format(new Date(comment.createDateTime))}</p>
                {userCheck}
            </div>
            <br />
            <br />
        </>
    )
}