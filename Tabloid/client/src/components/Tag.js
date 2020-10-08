import React from "react";
import { Button } from "reactstrap";

export default function Tag({ tag }) {
  return (
    <tr>
      <td>{tag.name}</td>
      <td>
        <Button color="warning">Edit</Button>{" "}
        <Button color="danger">Delete</Button>{" "}
      </td>
    </tr>
  );
}
