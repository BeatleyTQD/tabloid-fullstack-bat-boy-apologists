import React, {useContext, useEffect} from "react";
import Category from "./Category"
import {Button} from "reactstrap";
import CategoryContext from "../../providers/CategoryProvider";


export default function CategoryList() {
    const {category, getAllCategory} = useContext(CategoryContext);

    useEffect(() => {
        getAllCategory();
    }, []);

    return (
        <div className="container">
        <h1>Categories</h1>
        <p>
          <Button color="primary">Create</Button>{" "}
        </p>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Category Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {category.map((category) => (
              <Category key={category.id} tag={category} />
            ))}
          </tbody>
        </table>
      </div>
    )

}