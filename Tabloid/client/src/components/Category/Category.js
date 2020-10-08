import React, { useContext, useEffect } from "react";
import { Button } from "reactstrap";


const Category = ({ category }) => {
return (
    <tr>
        <td>{category.Name}</td>
        <td>
        <Button color="warning">Edit</Button>{" "}
        <Button color="danger">Delete</Button>{" "}
      </td>
    </tr>
)
}

export default Category;