import React from 'react';

export class AddUser extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isAuthenticated: false
        }
    }


    render() {
        const {isAuthenticated, currentUser} = this.state;
        console.log(this.state);
        return (
            <div className="container">
                Add user view
            </div>
        );
    }

}