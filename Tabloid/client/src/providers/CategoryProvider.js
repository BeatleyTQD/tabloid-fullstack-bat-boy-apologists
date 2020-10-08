import React, {useState, useContext} from "react";
import { UserProfileContext } from "./UserProfileProvider";


const CategoryContext = React.createContext();


export const CategoryProvider = (props) => {
    const [category, setCategory] = useState([]);
    const { getToken } = useContext(UserProfileContext);
    const apiUrl = "/api/Category";


    const getAllCategories = () =>
    getToken().then((token) =>
      fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => resp.json())
        .then(setCategory)
    );

    return (
        <CategoryContext.Provider value={{category, getAllCategories}}>
            {props.children}
        </CategoryContext.Provider>
    )

}


export default CategoryContext;