import React, { useContext, useEffect } from "react";
import UserProfile from "./UserProfile";
import { UserProfileContext } from "../providers/UserProfileProvider";

export default function UserProfileList() {
  const { users, getAllUsers } = useContext(UserProfileContext);

  //Gets all users to display upon initial render
  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className="container pt-5">
      <h1>Users</h1>
      <table className="table table-striped">
        <tbody>
          {users.map((u) => (
            <UserProfile key={u.id} user={u} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
