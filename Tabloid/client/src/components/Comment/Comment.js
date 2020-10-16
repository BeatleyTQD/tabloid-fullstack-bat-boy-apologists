import React, { useContext, useState } from 'react';

export default function Comment({ comment }) {

    return (
        <>
            <p>Subject:{comment.subject}</p>
            <p>Content:{comment.content}</p>
        </>
    )
}