import React, { useContext, useEffect, useState } from "react";
import { UserProfileContext } from '../providers/UserProfileProvider';

export default function UserProfileDetails(id) {
    const { getUserById } = useContext(UserProfileContext);
    const [user, setUser] = useState();

    useEffect(() => {
        getUserById(id)
            .then(setUser);
    }, []);

    console.log(user)
    
    return (
        <div className="container pt-5">
            <h4>User Details</h4>
            <dl>
                <dt className="col-sm-2">Full Name</dt>
                <dd class="col-sm-10">{user.fullName}</dd>
                <dt className="col-sm-2">Display Name</dt>
                <dd class="col-sm-10">{user.displayName}</dd>
                <dt className="col-sm-2">Email</dt>
                <dd class="col-sm-10">{user.email}</dd>
                <dt className="col-sm-2">Join Date</dt>
                <dd class="col-sm-10">{user.createDateTime}</dd>
                <dt className="col-sm-2">User Type</dt>
                <dd class="col-sm-10">{user.userName.name}</dd>
                <dt className="col-sm-2">Profile Image</dt>
                <dd class="col-sm-10"><img src={user.imageLocation}></img></dd>
            </dl>
        </div>
    )
}
