import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import UserProfileList from "./UserProfileList"

export default function UserProfileDetails() {
  const { getUserById } = useContext(UserProfileContext);
  const [user, setUser] = useState();
  const { id } = useParams();

  useEffect(() => {
    getUserById(id).then(setUser);
  }, []);
  console.log(user);

  if (!user) {
    return null;
  }
  return (
    <div className="container pt-5">
      <h4>User Details</h4>
      <dl>
        <dt className="col-sm-2">Full Name</dt>
        <dd className="col-sm-10">{user.fullName}</dd>
        <dt className="col-sm-2">Display Name</dt>
        <dd className="col-sm-10">{user.displayName}</dd>
        <dt className="col-sm-2">Email</dt>
        <dd className="col-sm-10">{user.email}</dd>
        <dt className="col-sm-2">Join Date</dt>
        <dd className="col-sm-10">{user.createDateTime}</dd>
        <dt className="col-sm-2">User Type</dt>
        <dd className="col-sm-10">{user.userType.name}</dd>
        <dt className="col-sm-2">Profile Image</dt>
        <dd className="col-sm-10">
          <img src={user.imageLocation} alt={user.fullName}></img>
        </dd>
      </dl>
    </div>
  );
}
