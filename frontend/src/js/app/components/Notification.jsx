import React from 'react';

export const Notification = props => {
    const {message, type, closeHandler} = props;
    return (
        <div className={"notification " + type}>
            <button className="delete" onClick={closeHandler}/>
            {message}
        </div>
    );
};
