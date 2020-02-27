import React from 'react';
import {Link} from "react-router-dom";

export class SummaryTableRow extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            summaries: []
        }
    }


    render() {
        const {summary} = this.props;

        return (
            <tr>
                <th>{summary.summaryId}</th>
                <td>{summary.date}</td>
                <td>{summary.longitude}</td>
                <td>{summary.longitude}</td>
                <td>{summary.trawlingCount}</td>
                <td>
                    <div className="button is-info">
                        <Link to={"/ui/summary/" + summary.summaryId}>Просмотреть детали</Link>
                    </div>
                </td>
            </tr>
        );
    }

}
