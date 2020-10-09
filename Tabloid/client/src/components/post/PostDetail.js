import React, { useEffect, useContext, useState } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { PostContext } from "../../providers/PostProvider";
import { useParams } from "react-router-dom";
import Post from "./Post";

const PostDetail = () => {
    const [post, setPost] = useState();
    const { getPost } = useContext(PostContext);
    const { id } = useParams();

    useEffect(() => {
        getPost(id).then(setPost);
    }, []);

    if (!post) {
        return null;
    }

    let imageTest = null;
    if (post.imageLocation) {
        imageTest = <section className="row justify-content-center">
            <div>
                <img src={post.imageLocation} />
            </div>
        </section>
    }
    console.log(post)
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

                    {/* <div className="row">
                            <a asp-action="Edit" asp-route-id="@Model.Post.Id" className="btn btn-outline-primary mx-1" title="Edit">
                                <i className="fas fa-pencil-alt"></i>
                            </a>
                            <a asp-action="Delete" asp-route-id="@Model.Post.Id" className="btn btn-outline-primary mx-1" title="Delete">
                                <i className="fas fa-trash"></i>
                            </a>

                            <a className="btn btn-outline-primary mx-1" asp-route-id="@Model.Post.Id" asp-area="" asp-controller="Comment" asp-action="Details">View Comments</a>
                            <a className="btn btn-outline-primary mx-1" asp-route-id="@Model.Post.Id" asp-area="" asp-controller="Comment" asp-action="Create">Add Comment</a>

                        </div> */}

                    {imageTest}

                    <section className="row post__content">
                        <p className="col-sm-12 mt-5">{post.content}</p>
                    </section>
                </section>
            </div>
        </div>
    );
};

export default PostDetail;