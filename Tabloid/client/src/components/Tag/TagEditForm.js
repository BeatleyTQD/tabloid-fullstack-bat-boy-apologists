import React, { useContext, useEffect, useState } from 'react';
import { TagContext } from '../../providers/TagProvider';
import { useHistory, useParams } from 'react-router-dom';


const TagEditForm = () => {
    const [tag, setTag] = useState({ name: "" })
    const { updateTag, getTagById } = useContext(TagContext);
    const { id } = useParams();

    const handleFieldChange = evt => {
        const stateToChange = tag;
        stateToChange[evt.target.id] = evt.target.value;
        setTag(stateToChange);
        console.log(stateToChange)
    };

    useEffect(() => {
        getTagById(parseInt(id))
            .then(tag => setTag(tag));
    })


    return (
        <>
            <div className="container pt-5">
                <div className="card col-md12">
                    <h3 className="mt-3 text-primary text-center card-title">Edit a Tag</h3>
                    <form className="mt-5 card-body">
                        <div className="form-group">
                            <input className="form-control" id="name" value={tag.name} onChange={handleFieldChange} />
                        </div>
                        <div className="form-group">
                            {/* <input type="submit" value="Save Tag" className="btn btn-primary btn-block" onClick={makeNewTag} /> */}
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
};

export default TagEditForm;