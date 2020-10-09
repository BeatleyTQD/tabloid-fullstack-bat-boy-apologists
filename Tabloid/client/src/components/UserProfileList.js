import React, { useContext, useEffect } from "react";
import { Button } from "reactstrap";
import UserProfile from "./UserProfile";
import { UserProfileContext } from "../providers/UserProfileProvider";

export default function UserProfileList() {
  const { users, getAllUsers,getDeactivatedUsers } = useContext(UserProfileContext);
  
  const callDeactivatedUsers = () => {

    getDeactivatedUsers();
    document.getElementById("button__activeUsers").classList.remove("hidden")
    document.getElementById("button__inactiveUsers").classList.add("hidden")
  }

  const callActiveUsers = () => {
    getAllUsers();
    document.getElementById("button__inactiveUsers").classList.remove("hidden")
    document.getElementById("button__activeUsers").classList.add("hidden")

  }

  //Gets all users to display upon initial render
  useEffect(() => {
    getAllUsers();
    document.getElementById("button__inactiveUsers").classList.remove("hidden")
    document.getElementById("button__activeUsers").classList.add("hidden")
  }, []);

  return (


    <div className="container pt-5">
        <div className="float-right">
        <Button id="button__inactiveUsers"  onClick={callDeactivatedUsers}>View Deactivated Users</Button>
        <Button id="button__activeUsers" onClick={callActiveUsers}>View Active Users</Button>
        </div>
      <h1>Users</h1>
      <table className="table table-striped">
        <th>Full Names</th>
        <th>User Names</th>
        <th>User Type</th>
        <th>Actions</th>
        <tbody>
          {users.map((u) => (
            <UserProfile key={u.id} user={u} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
