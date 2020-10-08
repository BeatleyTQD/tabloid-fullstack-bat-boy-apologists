import React, {useContext, useEffect} from "react";
import Category from "./Category"
import {Button} from "reactstrap";
import {CategoryContext} from "../../providers/CategoryProvider";


const CategoryList = () => {
    const {category, getAllCategories} = useContext(CategoryContext);

    useEffect(() => {
        getAllCategories();
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
            {category.map((element) => (
              <Category key={element.id} category={element} />
            ))}
          </tbody>
        </table>
      </div>
    )

}

export default CategoryList;