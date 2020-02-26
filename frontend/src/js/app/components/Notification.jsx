import React from 'react';

export class Notification extends React.Component {

    render() {
        const { message, type, closeHandler } = this.props;
        return (
            <div className={"notification " + type}>
                <button className="delete" onClick={closeHandler}/>
                {message}
            </div>
        );
    }

}
