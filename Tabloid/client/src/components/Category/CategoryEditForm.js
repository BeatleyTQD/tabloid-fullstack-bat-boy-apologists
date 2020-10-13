import React, { useContext, useEffect, useState } from 'react';
import { CategoryContext } from '../../providers/CategoryProvider';
import { useHistory, useParams } from 'react-router-dom';
import { Button } from 'reactstrap';


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
        setTag(stateToChange);
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
                    <h3 className="mt-3 text-primary text-center card-title">Add a Category</h3>
                    <form className="mt-5 card-body">
                        <div className="form-group">
                            <input className="form-control" id="Name" onChange={handleFieldChange} />
                        </div>
                        <div className="form-group">
                            <input type="button" value="Add" className="btn btn-primary btn-block" onClick={newCategory} />
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}