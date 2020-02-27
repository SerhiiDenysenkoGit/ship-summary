import React from 'react';

export class SummaryRecordTableRow extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        const {record} = this.props;

        return (
            <tr>
                <th>{record.name}</th>
                <td>{record.units}</td>
                <td>{record.day}</td>
                <td>{record.board}</td>
            </tr>
        );
    }

}
