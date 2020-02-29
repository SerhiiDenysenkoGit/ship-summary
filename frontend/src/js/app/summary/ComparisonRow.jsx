import React from 'react';

export class ComparisonRow extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        const {firstRecord, secondRecord} = this.props;

        return (
            <tr>
                <td>{firstRecord.typeName ? firstRecord.typeName : secondRecord.typeName}</td>
                <td>{firstRecord.day ? firstRecord.day + ' ' + firstRecord.units : ''}</td>
                <td>{firstRecord.board + ' ' + firstRecord.units}</td>
                <td>{secondRecord.day ? secondRecord.day + ' ' + secondRecord.units : ''}</td>
                <td>{secondRecord.day ? secondRecord.board + ' ' + secondRecord.units : ''}</td>
            </tr>
        );
    }

}
