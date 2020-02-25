import React from 'react';

export class SummaryList extends React.Component {

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
                Summary list view
            </div>
        );
    }

}
