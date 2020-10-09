import React, { useState, useContext } from "react";

export const CategoryContext = React.createContext();


export const CategoryProvider = (props) => {
    const [category, setCategory] = useState([]);
    const apiUrl = "/api/Category";
    const getAllCategories = () => {
        return fetch(apiUrl)
            .then((res) => res.json())
            .then(setCategory);
    };



    return (
        <CategoryContext.Provider value={{ category, getAllCategories }}>
            {props.children}
        </CategoryContext.Provider>
    )

}

