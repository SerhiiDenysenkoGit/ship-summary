import React from 'react';

export class ComparisonRow extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        const {firstRecord, secondRecord} = this.props;
        console.log(this.props);

        return (
            <tr>
                <td>{firstRecord.typeName}</td>
                <td>{firstRecord.day}</td>
                <td>{firstRecord.board}</td>
                <td>{secondRecord.day}</td>
                <td>{secondRecord.board}</td>
            </tr>
        );
    }

}
