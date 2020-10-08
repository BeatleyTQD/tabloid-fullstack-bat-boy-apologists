import React, { useContext, useState } from 'react';
import { TagContext } from '../../providers/TagProvider';
import { useHistory } from 'react-router-dom';

const TagForm = () => {
    const [tag, setTag] = useState({ name: "" })
    const { addTag } = useContext(TagContext);
    const history = useHistory();

    const handleFieldChange = evt => {
        const stateToChange = tag;
        stateToChange[evt.target.id] = evt.target.value;
        setTag(stateToChange);
        console.log(stateToChange)
    };

    //works half the time? Sporadically? Will never redirect to list, despite my best efforts and refactoring the code ten different ways.
    const makeNewTag = () => {
        addTag(tag)
    }

    return (
        <>
            <div className="container pt-5">
                <div className="card col-md12">
                    <h3 className="mt-3 text-primary text-center card-title">Create a Tag</h3>
                    <form className="mt-5 card-body">
                        <div className="form-group">
                            <input className="form-control" id="name" onChange={handleFieldChange} />
                        </div>
                        <div className="form-group">
                            <input type="submit" value="Save Tag" className="btn btn-primary btn-block" onClick={makeNewTag} />
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
};

export default TagForm;