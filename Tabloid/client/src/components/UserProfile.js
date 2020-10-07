import React from "react";
import { Button } from 'reactstrap';

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
            <td>
                <Button color="info">Details</Button>{' '}
                <Button color="warning">Edit</Button>{' '}
                <Button color="danger">Deactivate</Button>{' '}
            </td>
        </tr>
    )
};