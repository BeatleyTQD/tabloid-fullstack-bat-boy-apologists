import React from "react";
import { Button } from "reactstrap";


const Category = (props) => {
  
return (
    <tr>
        <td>{props.category.name}</td>
        <td>
        <Button color="warning">Edit</Button>{" "}
        {props.category.name.toLowerCase() !== "other" ? <Button onClick={() => {props.delete(props.category.id)}} color="danger">Delete</Button> : null}
      </td>
    </tr>
)
}

export default Category;