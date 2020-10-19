import React, { useEffect, useContext, useState } from "react";
import { PostContext } from "../../providers/PostProvider";
import { PostTagContext } from "../../providers/PostTagProvider";
import { Button, Modal, ModalHeader, ModalFooter } from "reactstrap";
import { useHistory, useParams, Link } from 'react-router-dom';


const PostDetail = () => {
    const [post, setPost] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const { getPost, deletePost, addSubscription, unsubscribe, getSubscriptions, subscriptions } = useContext(PostContext);
    const { postTags, getTagsByPostId } = useContext(PostTagContext);

    const { id } = useParams();
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const history = useHistory();
    const currentUser = JSON.parse(sessionStorage.userProfile)
    const currentUserId = currentUser.id

    const LoadPost = (id) => {
        getPost(id)
            .then((postResponse) => {
                setPost(postResponse);
                getTagsByPostId(postResponse.id);
                getSubscriptions()
                setIsLoading(false);
            })
    }

    const subscribeToAuthor = () => {
        const newSubscription = {
            "providerUserProfileId": post.userProfileId
        }
        setIsLoading(true)
        addSubscription(newSubscription)
            .then((response) => {
                if (response !== false) {
                    LoadPost(id);
                } else {
                    window.alert("You cannot subscribe to your own posts.")
                    LoadPost(id);
                }
            })
    }

    const unsubscribeAuthor = () => {

        const oldSubscription = {
            "providerUserProfileId": post.userProfileId
        }
        setIsLoading(true)
        unsubscribe(oldSubscription)
            .then(() => {
                LoadPost(id);
            })
    }


    const ManageTags = () => {
        history.push(`/posttag/${post.id}`)
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
    let userCheck;
    if (!isLoading) {
        if (post.imageLocation) {
            imageTest = <section className="row justify-content-center">
                <div>
                    <img style={{ maxWidth: "500px", maxHeight: "auto" }} src={post.imageLocation.startsWith("http") ? post.imageLocation : `/${post.imageLocation}`} />
                </div>
            </section>
        }
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
    }




    useEffect(() => {
        LoadPost(id);


    }, [id]);







    return (
        (!isLoading && post !== undefined) ?
            (

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
                                    {}
                            Subscribe: {
                                        (currentUserId !== post.userProfileId) ?
                                            (

                                                (subscriptions.find((subscription) => { return subscription.providerUserProfileId === post.userProfileId })) ?

                                                    <Button className="btn__unsubscribe bg-info" onClick={unsubscribeAuthor}>Unsubscribe</Button>
                                                    :
                                                    <Button className="btn__subscribe bg-primary" onClick={subscribeToAuthor}>Subscribe</Button>) : <strong>Your Post</strong>}<br />
                            This post takes approximately {post.readTime} {(post.readTime == 1) ? "minute" : "minutes"} to read

                        </p>
                                <p className="text-black-50">Published on {new Intl.DateTimeFormat('en-US').format(new Date(post.publishDateTime))}</p>
                            </div>

                            <div className="row justify-content-sm-start div__tags" >
                                <Button onClick={ManageTags} >Manage Tags</Button>

                                {(postTags !== null || postTags !== undefined) && postTags.map((postTag) => <span key={postTag.id} className="span__posttag">{postTag.name}</span>)}

                            </div>

                            {userCheck}

                            {imageTest}


                            <section className="row post__content">
                                <p className="col-sm-12 mt-5">{post.content}</p>
                            </section>
                        </section>
                        <Button color="info" onClick={Comments}>Comments</Button>
                    </div>
                </div>
            ) : null
    );

};

export default PostDetail;