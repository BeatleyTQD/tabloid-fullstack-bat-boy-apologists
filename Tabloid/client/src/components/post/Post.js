import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { PostContext } from "../../providers/PostProvider";
import { Button, Modal, ModalHeader, ModalFooter } from "reactstrap";
import { useParams } from 'react-router-dom';

const Post = ({ post }) => {
    const { deletePost, getAllPosts } = useContext(PostContext);
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const currentUser = JSON.parse(sessionStorage.userProfile)
    const currentUserId = currentUser.id

    const Delete = () => {
        deletePost(post.id)
            .then(toggle)
            .then(getAllPosts)
    }

    let userCheck;
    if (post.userProfileId === currentUserId || sessionStorage.getItem("userProfile").search('"name":"10g03kd03212d3213d213d123cvb"') !== -1) {
        userCheck =
            <>
                &nbsp;
                {post.userProfileId === currentUserId ?
                <Link to={`/post/${post.id}/edit`} className="btn btn-warning" title="Edit">Edit</Link> : null }
                &nbsp;
                <Button color="danger" onClick={toggle} >Delete</Button>
                <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle}>Are you sure you want to delete this post?</ModalHeader>
                    <ModalFooter>
                        <Button color="danger" onClick={Delete}>Delete</Button>
                        <Button color="secondary" onClick={toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </>
    }

    return (
        <tr>
            <td>
                {post.title}
            </td>
            <td>
                {post.userProfile.displayName}
            </td>
            <td>
                {post.category.name}
            </td>
            <td>
                {new Intl.DateTimeFormat('en-US').format(new Date(post.publishDateTime))}
            </td>
            <td>
                <Link to={`/post/${post.id}`} className="btn btn-info" title="Details">
                    Details
                </Link>

                {userCheck}
            </td>
        </tr>
    );
};

export default Post;