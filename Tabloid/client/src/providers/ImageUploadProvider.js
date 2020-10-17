import React, { createContext } from "react";
import { post } from 'axios';

export const ImageContext = createContext();

export const ImageUploadProvider = (props) => {

    const apiUrl = "/api/ImageUpload";

    const uploadImage = (image) => {
        const formData = new FormData();
        formData.append('body', image)
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return post(apiUrl, formData, config)
    };

    return (
        <ImageContext.Provider value={{ uploadImage }}>
            {props.children}
        </ImageContext.Provider>
    );
};

