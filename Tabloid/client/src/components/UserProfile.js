import React from "react";
import { Button } from 'reactstrap';
import { useHistory } from 'react-router-dom';


export default function UserProfile({ user }) {
    const history = useHistory();

    const Details = () => {
        history.push(`userprofiles/${user.id}`)
    };

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
                <Button color="info" onClick={Details}>Details</Button>{' '}
                <Button color="warning">Edit</Button>{' '}
                <Button color="danger">Deactivate</Button>{' '}
            </td>
        </tr>
    )
};