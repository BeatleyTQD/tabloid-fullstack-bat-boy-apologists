import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogLabel,
  AlertDialogDescription

} from "@reach/alert-dialog";
import { Dialog } from "@reach/dialog";
import VisuallyHidden from "@reach/visually-hidden";
import { Button } from "reactstrap";
import { UserProfileContext } from "../../providers/UserProfileProvider";


export default function UserProfile({ user }) {
  const { deactivateUserProfile,getAllUsers, getDeactivatedUsers,reactivateUserProfile }  = useContext(UserProfileContext);
  const history = useHistory();
  
  const [showAlertDialog, setShowAlertDialog] = React.useState(false);
  const cancelRef = React.useRef();
  const openAlert = () => setShowAlertDialog(true);
  const closeAlert = () => setShowAlertDialog(false);

  const [showDialog, setShowDialog] = React.useState(false);
  const open = () => setShowDialog(true);
  const close = () => setShowDialog(false);

  const activateUser = () => {
    reactivateUserProfile(user.id)
    .then((u) => {
      getDeactivatedUsers();
    })
  }

  const Details = () => {
    history.push(`userprofiles/${user.id}`);
  };

  const editUser = () => {
    history.push(`/userprofiles/edit/${user.id}`)
  }
  
  const deleteUser = () => {
    deactivateUserProfile(user.id).then((u) => {
      if (u === true) {
        getAllUsers();
      } else {
        setShowDialog(true);;
      }
    });
    setShowAlertDialog(false);
  };

  return (
    <tr>
      <td>{user.fullName}</td>
      <td>{user.displayName}</td>
      <td>{user.userType.name}</td>
      <td>
        <Button color="info" onClick={Details}>
          Details
        </Button>{" "}
        <Button color="warning" onClick={editUser}>Edit</Button>{" "}
        {(user.isDeactivated === 0) ? <Button color="danger" onClick={openAlert}>
          Deactivate
        </Button> :
        <Button color="primary" onClick={activateUser}>
          Activate
        </Button> }
        {" "}
        {showAlertDialog && (
        <AlertDialog leastDestructiveRef={cancelRef} className="dialogborder">
          <AlertDialogLabel>Please Confirm!</AlertDialogLabel>
          <AlertDialogDescription>
            Are you sure you want to deactivate this user?
          </AlertDialogDescription>
          <div className="alert-buttons">
            <button onClick={deleteUser}>Yes, delete</button>{" "}
            <button ref={cancelRef} onClick={closeAlert}>
              Cancel
            </button>
          </div>
        </AlertDialog>
      )}
       <Dialog isOpen={showDialog} onDismiss={close}  className="dialogborder" aria-label="Warning">
        <button className="close-button" onClick={close}>
          <VisuallyHidden>Close</VisuallyHidden>
          <span aria-hidden>Close</span>
        </button>
        <p>You cannot deactivate the lone admin user.</p>
      </Dialog>
      </td>
    </tr>
    
  );
}
