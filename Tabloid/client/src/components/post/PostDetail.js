import React, { useEffect, useContext, useState } from "react";
import { PostContext } from "../../providers/PostProvider";
import { Button, Modal, ModalHeader, ModalFooter } from "reactstrap";
import { useHistory, useParams, Link } from 'react-router-dom';

const PostDetail = () => {
    const [post, setPost] = useState();
    const { getPost, deletePost } = useContext(PostContext);
    const { id } = useParams();
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const history = useHistory();
    const currentUser = JSON.parse(sessionStorage.userProfile)
    const currentUserId = currentUser.id

    useEffect(() => {
        getPost(id).then(setPost);
    }, []);

    if (!post) {
        return null;
    }

    const Delete = () => {
        deletePost(post.id)
            .then(toggle)
            .then(() => {
                history.push("/post");
            })
    }

    const Comments = () => {
        history.push(`/comments/${id}`)
    }

    let imageTest = null;
    if (post.imageLocation) {
        imageTest = <section className="row justify-content-center">
            <div>
                <img src={post.imageLocation} />
            </div>
        </section>
    }

    let userCheck;
    if (post.userProfileId === currentUserId) {
        userCheck =
            <div className="row">
                <Link to={`/post/${post.id}/edit`} className="btn btn-warning" title="Edit">Edit</Link>
                &nbsp;
                <Button color="danger" onClick={toggle}>Delete</Button>
                <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle}>Are you sure you want to delete this post?</ModalHeader>
                    <ModalFooter>
                        <Button color="danger" onClick={Delete}>Delete</Button>
                        <Button color="secondary" onClick={toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
    }

    return (
        <div className="container">
            <div className="post">
                <section className="px-3">
                    <div className="row justify-content-between">
                        <h1 className="text-secondary">{post.title}</h1>
                        <h1 className="text-black-50">{post.category.name}</h1>
                    </div>
                    <div className="row justify-content-between">
                        <p className="text-secondary">
                            Written by {post.userProfile.displayName}
                            <br />
                            This post takes approximately {post.readTime} {(post.readTime == 1) ? "minute" : "minutes"} to read

                        </p>
                        <p className="text-black-50">Published on {new Intl.DateTimeFormat('en-US').format(new Date(post.publishDateTime))}</p>
                    </div>

                    {/* <div className="row justify-content-sm-start" style="padding-bottom:1em;">
                            <span style="padding-right:2em;"><a className="btn btn-outline-dark btn-sm mx-1" asp-route-id="@Model.Post.Id" asp-area="" asp-controller="PostTag" asp-action="Edit">Manage Tags</a></span>
                            @foreach(Tag tag in Model.Tags) { <span style="font-size:1em;padding-right:1em">@tag.Name</span> }
                        </div> */}

                    {userCheck}

                    {imageTest}

                    <section className="row post__content">
                        <p className="col-sm-12 mt-5">{post.content}</p>
                        <Button color="info" onClick={Comments}>Comments</Button>
                    </section>
                </section>
            </div>
        </div>
    );
};

export default PostDetail;