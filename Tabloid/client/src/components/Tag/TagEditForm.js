import React, { useContext, useEffect, useState } from 'react';
import { TagContext } from '../../providers/TagProvider';
import { useHistory, useParams } from 'react-router-dom';


const TagEditForm = () => {
    const [tag, setTag] = useState();
    const { updateTag, getTagById } = useContext(TagContext);
    const { id } = useParams();

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
                            <input type="button" value="Save Tag" className="btn btn-primary btn-block" onClick={SaveTag} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default TagEditForm;