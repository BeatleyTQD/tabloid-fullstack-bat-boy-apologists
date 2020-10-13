import React, { useContext, useEffect, useState } from 'react';
import { CategoryContext } from '../../providers/CategoryProvider';
import { useHistory, useParams } from 'react-router-dom';


const CategoryEditForm = () => {
    const [category, setCategory] = useState();
    const { updateCategory, getCategoryById } = useContext(CategoryContext);
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        getCategoryById(id)
            .then(setCategory);
    }, [])

    const handleFieldChange = evt => {
        const stateToChange = { ...category };
        stateToChange[evt.target.id] = evt.target.value;
        setCategory(stateToChange);
    };

    const SaveCategory = () => {
        const editedCategory = {
            id: parseInt(id),
            name: category.name
        };
        updateCategory(editedCategory)
            .then(() => history.push("/category"));
    };

    const Cancel = () => {
        history.push("/category")
    };

    if (!category) {
        return null;
    }

    return (
        <>
            <div className="container pt-5">
                <div className="card col-md12">
                    <h3 className="mt-3 text-primary text-center card-title">Edit a Category</h3>
                    <form className="mt-5 card-body">
                        <div className="form-group">
                            <input className="form-control" id="name" value={category.name} onChange={handleFieldChange} />
                        </div>
                        <div className="form-group">
                            <input type="button" value="Save" className="btn btn-primary btn-block" onClick={SaveCategory} />
                            <input type="button" value="Cancel" className="btn btn-primary btn-block" onClick={Cancel} />
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default CategoryEditForm