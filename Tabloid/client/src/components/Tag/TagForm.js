import React, { useContext, useState } from 'react';
import { TagContext } from '../../providers/TagProvider';
import { useHistory } from 'react-router-dom';
import { Button } from 'reactstrap';


const TagForm = () => {
    const [tag, setTag] = useState({ name: "" })
    const { addTag } = useContext(TagContext);
    const history = useHistory();

    const handleFieldChange = evt => {
        const stateToChange = tag;
        stateToChange[evt.target.id] = evt.target.value;
        setTag(stateToChange);
    };

    const makeNewTag = () => {
        addTag(tag)
            .then(() => history.push("/tags"));
    };


    return (
        <>
            <div className="container pt-5">
                <div className="card col-md12">
                    <h3 className="mt-3 text-primary text-center card-title">Create a Tag</h3>
                    <div className="mt-5 card-body">
                        <div className="form-group">
                            <input className="form-control" id="name" onChange={handleFieldChange} />
                        </div>
                        <div className="form-group">
                            <Button color="primary" onClick={makeNewTag}>Save Tag</Button>{" "}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default TagForm;