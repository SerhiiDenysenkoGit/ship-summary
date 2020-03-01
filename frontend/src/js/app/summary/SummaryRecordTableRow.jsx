import React from 'react';

export function SummaryRecordTableRow(props) {
    const {record} = props;

    return (
        <tr>
            <th>{record.typeName}</th>
            <td>{record.units}</td>
            <td>{record.day}</td>
            <td>{record.board}</td>
        </tr>
    );
}
