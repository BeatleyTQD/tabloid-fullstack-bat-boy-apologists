import React from "react";
import { Button } from 'reactstrap';
import { Link } from "react-router-dom";

const Post = ({ post }) => {

    const currentUser = JSON.parse(sessionStorage.userProfile)
    const currentUserId = currentUser.id

    let userCheck;
    if (post.userProfileId === currentUserId) {
        userCheck = <> <Link to={`/post/${post.id}`} className="btn btn-warning" title="Edit">Edit</Link> <Link to={`/post/${post.id}`} className="btn btn-danger" title="Delete">Delete</Link></>
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

                {/*
                 <a asp-action="Edit" asp-route-id="@item.Id" class="btn btn-outline-primary mx-1" title="Edit">
                    <i class="fas fa-pencil-alt"></i>
                </a>
                <a asp-action="Delete" asp-route-id="@item.Id" class="btn btn-outline-primary mx-1" title="Delete">
                    <i class="fas fa-trash"></i>
                </a> */}
            </td>
        </tr>
    );
};

export default Post;