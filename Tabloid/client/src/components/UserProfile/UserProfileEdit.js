import React, { useContext, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import { UserTypeContext } from "../../providers/UserTypeProvider";
import UserTypeSelect from "../UserType/UserTypeSelect";
import { Dialog } from "@reach/dialog";
import VisuallyHidden from "@reach/visually-hidden";
import { Button } from "reactstrap";
import "./UserProfile.css";

export default function UserProfileEdit() {
  const { saveUser } = useContext(UserProfileContext);
  const { getUserById } = useContext(UserProfileContext);
  const [user, setUser] = useState();
  const { id } = useParams();
  const history = useHistory();


  const [showDialog, setShowDialog] = React.useState(false);
  const open = () => setShowDialog(true);
  const close = () => setShowDialog(false);
  

  const checkSelect = () => {
    const selectBox = document.getElementById("userTypeId");
    return parseInt(selectBox.value);
  };

  const CancelSave = (evt) => {
    history.push("/userprofiles");
  }

  const saveUserType = (evt) => {
    evt.preventDefault();
    user.userTypeId = checkSelect();
    user.userType.id = user.userTypeId;
    user.userType.name = (user.userTypeId === 1) ? "Admin" : "Author";
    console.log(user);
    saveUser(user).then((response) => {
        console.log(response);
        if (response === true) {
          history.push("/userprofiles");
        } else {
          setShowDialog(true);;
        }
      });

  };
  

  useEffect(() => {
    getUserById(id).then(setUser)
    .then(()=> {
        
    });

  }, []);
  

  if (!user) {
    return null;
  }
  return (
    <div className="container pt-5">
      <h4>User Edit</h4>
      <form className="form__user__edit">
        <UserTypeSelect />
        <div className="form-group">
        <Button
                  color="primary"
                  type="button"
                  className="btn"
                  onClick={saveUserType}
                >
                  Save
                </Button>
                <Button
                  color="secondary"
                  type="button"
                  className="btn"
                  onClick={CancelSave}
                >
                  Cancel
                </Button>
                
         </div>
      </form>
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
      <Dialog isOpen={showDialog} onDismiss={close}  className="dialogborder" aria-label="Warning">
        <button className="close-button" onClick={close}>
          <VisuallyHidden>Close</VisuallyHidden>
          <span aria-hidden>Close</span>
        </button>
        <p>There must be at least one admin user.</p>
      </Dialog>
    </div>
  );
}
