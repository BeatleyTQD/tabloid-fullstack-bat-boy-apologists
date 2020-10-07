import React from "react";
import { Link } from "react-router-dom";

const Post = ({ post }) => {
    return (
        <tr>
            <td>
                {post.title}
            </td>
            <td>
                {post.userProfile.name}
            </td>
            <td>
                {post.category.name}
            </td>
            <td>
                {post.publishDateTime}
            </td>
            <td>
                <Link to={`/posts/${post.id}`} class="btn btn-outline-primary mx-1" title="View">
                    <i class="fas fa-eye"></i>
                </Link>

                {/* <a asp-action="Edit" asp-route-id="@item.Id" class="btn btn-outline-primary mx-1" title="Edit">
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