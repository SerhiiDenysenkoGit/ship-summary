import React from 'react';

export function SummaryAverageRow(props) {
    const {averageRecord} = props;

    return (
        <tr>
            <td>{averageRecord.typeName}</td>
            <td>{averageRecord.dayAvg}</td>
        </tr>
    );
}
