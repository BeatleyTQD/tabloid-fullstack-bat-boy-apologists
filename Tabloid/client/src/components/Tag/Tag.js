import React from "react";
import { Button } from "reactstrap";
import { useHistory } from 'react-router-dom';


export default function Tag({ tag }) {
  const history = useHistory();

  const Edit = () => {
    history.push(`tags/${tag.id}/edit`)
  }
  
  return (
    <tr>
      <td>{tag.name}</td>
      <td>
        <Button color="warning" onClick={Edit}>Edit</Button>{" "}
        <Button color="danger">Delete</Button>{" "}
      </td>
    </tr>
  );
}
