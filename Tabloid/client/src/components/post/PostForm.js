import React, { useState, useContext, useEffect } from "react";
import { PostContext } from "../../providers/PostProvider";
import { CategoryContext } from "../../providers/CategoryProvider";
import { ImageContext } from "../../providers/ImageUploadProvider";
import { useHistory } from "react-router-dom";

const PostForm = () => {
    const { addPost } = useContext(PostContext);
    const [post, setPost] = useState({ title: "", isApproved: true, content: "", imageLocation: undefined, createDateTime: "", publishDateTime: "", categoryId: 0, userProfileId: 0 })
    const { category, getAllCategories } = useContext(CategoryContext);
    const [isLoading, setIsLoading] = useState(false);

    const { uploadImage } = useContext(ImageContext)
    const [theFile, setFile] = useState(null)

    const history = useHistory();
    const currentUser = JSON.parse(sessionStorage.userProfile);

    useEffect(() => {
        getAllCategories();
    }, []);

    const handleFieldChange = evt => {
        const stateToChange = { ...post }
        stateToChange[evt.target.id] = evt.target.value
        setPost(stateToChange)
    }

    const handleImgChange = e => {
        setFile(e.target.files[0]);
    }

    const submit = (e) => {
        setIsLoading(true)
        post.createDateTime = new Date();
        post.userProfileId = currentUser.id;

        if (theFile != null) {
            post.imageLocation = theFile.name;
            uploadImage(theFile);
        };

        post.categoryId = parseInt(post.categoryId);
        addPost(post).then((p) => {
            history.push(`/post/${p.id}`);
        });
    };


    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="card col-md-12 col-lg-8">
                    <h3 className="mt-3 text-primary text-center card-title">What do you have to say?</h3>
                    <div className="mt-5 card-body">
                        <div className="text-danger"></div>
                        <div className="form-group">
                            <label htmlFor="title" className="control-label">Title</label>
                            <input
                                id="title"
                                className="form-control"
                                onChange={handleFieldChange}
                                value={post.title}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="imageLocation" className="control-label">Header Image</label>
                            <input
                                id="imageLocation"
                                type="file"
                                accept="image/*"
                                className="form-control"
                                onChange={handleImgChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="publishDateTime" className="control-label">Publish Date</label>
                            <input
                                id="publishDateTime"
                                className="form-control"
                                onChange={handleFieldChange}
                                value={post.publishDateTime}
                                type="date"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="categoryId" className="control-label">Category</label>
                            <select
                                id="categoryId"
                                className="form-control"
                                onChange={handleFieldChange}
                                value={post.categoryId}
                            >
                                <option value="">Category</option>
                                {category.map(aCategory =>
                                    <option value={aCategory.id} key={aCategory.id}>{aCategory.name}</option>
                                )}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="content" className="control-label">Content</label>
                            <textarea
                                id="content"
                                rows="15"
                                className="form-control post__content-input"
                                onChange={handleFieldChange}
                                value={post.content}
                            >
                            </textarea>
                        </div>
                        <div className="form-group">
                            <button disabled={isLoading} onClick={submit} className="btn btn-primary btn-block">SAVE</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default PostForm