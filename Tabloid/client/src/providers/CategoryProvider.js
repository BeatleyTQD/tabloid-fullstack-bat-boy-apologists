import React, {useState, useContext} from "react";

export const CategoryContext = React.createContext();


export const CategoryProvider = (props) => {
    const [category, setCategory] = useState([]);
    const apiUrl = "/api/Category";
    const getAllCategories = () => {
      return fetch(apiUrl)
          .then((res) => res.json())
          .then(setCategory);
  };

  const addCategory = (category) => {
    return fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(category)
    });
  };

  

    return (
        <CategoryContext.Provider value={{category, getAllCategories, addCategory}}>
            {props.children}
        </CategoryContext.Provider>
    )

}

