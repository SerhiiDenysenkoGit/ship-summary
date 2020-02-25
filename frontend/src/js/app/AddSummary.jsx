import React from 'react';

export class AddSummary extends React.Component {

    constructor(props) {
        super(props);

    }


    render() {
        console.log(this.state);
        return (
            <div className="container">
                Add summary view
            </div>
        );
    }

}