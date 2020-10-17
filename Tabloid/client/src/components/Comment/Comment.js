import React from 'react';

export default function Comment({ comment }) {

    return (
        <>
            <div>
                <h5 className="text-primary">{comment.subject}</h5>
                <p>{comment.content}</p>
                <span>{comment.user.displayName}</span>
                <p className="text-secondary">{new Intl.DateTimeFormat('en-US').format(new Date(comment.createDateTime))}</p>
            </div>
            <br />
            <br />
        </>
    )
}