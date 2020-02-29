import React from 'react';

export class SummaryAverageRow extends React.Component {

    render() {
        const {averageRecord} = this.props;

        return (
            <tr>
                <td>{averageRecord.typeName}</td>
                <td>{averageRecord.dayAvg}</td>
            </tr>
        );
    }

}
