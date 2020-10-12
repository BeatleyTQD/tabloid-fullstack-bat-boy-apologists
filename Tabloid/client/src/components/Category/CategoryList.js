import React, {useContext, useEffect} from "react";
import Category from "./Category"
import {Button} from "reactstrap";
import {CategoryContext} from "../../providers/CategoryProvider";
import {Link} from "react-router-dom";

const CategoryList = () => {
    const {category, getAllCategories} = useContext(CategoryContext);
    const {deleteCategory} = useContext(CategoryContext);

    useEffect(() => {
        getAllCategories();
    }, []);

const deleteCategoryFromList = (id) => {

  if(window.confirm("Are you sure?"))
  {
    deleteCategory(id).then(() => {
      getAllCategories();
    });
  }
 
  
}


    return (
        <div className="container">
        <h1>Categories</h1>
        <p>
          <Link to="/category/add">
          <Button color="primary">Create</Button>{" "}
          </Link>
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
              <Category key={element.id} category={element} delete={deleteCategoryFromList}/>
            ))}
          </tbody>
        </table>
      </div>
    )

}

export default CategoryList;