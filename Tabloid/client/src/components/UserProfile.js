import React from "react";

export default function UserProfile({ user }) {
    return (
        <tr>
            <td>
                {user.fullName}
            </td>
            <td>
                {user.displayName}
            </td>
            <td>
                {user.userType.name}
            </td>
        </tr>
    )
};