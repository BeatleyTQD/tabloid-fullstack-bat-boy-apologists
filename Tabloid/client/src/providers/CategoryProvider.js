import React, {useState} from "react";


export const CategoryContext = React.createContext();


export const CategoryProvider = (props) => {
    const [category, setCategory] = useState([]);

    const getAllCategories = () => {
        return fetch("/api/Category").then((data) => data.json()
        .then(setCategory));
    }

    return (
        <CategoryContext.Provider value={{category, getAllCategories}}>
            {props.children}
        </CategoryContext.Provider>
    )

}