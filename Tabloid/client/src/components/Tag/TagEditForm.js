import React, { useContext, useEffect, useState } from 'react';
import { TagContext } from '../../providers/TagProvider';
import { useHistory, useParams } from 'react-router-dom';
import { Button } from 'reactstrap';


const TagEditForm = () => {
    const [tag, setTag] = useState();
    const { updateTag, getTagById } = useContext(TagContext);
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        getTagById(id)
            .then(setTag);
    }, [])

    const handleFieldChange = evt => {
        const stateToChange = { ...tag };
        stateToChange[evt.target.id] = evt.target.value;
        setTag(stateToChange);
    };

    const SaveTag = () => {
        const editedTag = {
            id: parseInt(id),
            name: tag.name
        };
        updateTag(editedTag);
        history.push("/tags");
    }


    if (!tag) {
        return null;
    }
    return (
        <>
            <div className="container pt-5">
                <div className="card col-md12">
                    <h3 className="mt-3 text-primary text-center card-title">Edit a Tag</h3>
                    <div className="mt-5 card-body">
                        <div className="form-group">
                            <input className="form-control" id="name" value={tag.name} onChange={handleFieldChange} />
                        </div>
                        <div className="form-group">
                            <Button color="primary" onClick={SaveTag}>Save Tag</Button>{" "}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default TagEditForm;