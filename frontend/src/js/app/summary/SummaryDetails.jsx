import React from 'react';
import {SummaryInfo} from "./SummaryInfo";
import {SummaryRecordRow} from "./SummaryRecordRow";
import axios from 'axios';
import {createPath} from "../../commons";
import {CommonService} from "../../CommonService";
import {SummaryTableRow} from "./SummaryTableRow";
import {SummaryRecordTableRow} from "./SummaryRecordTableRow";

export class SummaryDetails extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            summary: {},
            isLoaded: false
        };

    }

    componentDidMount() {
        axios
            .get(createPath("/api/summaries/" + this.props.match.params.id), CommonService.getAuthHeaders())
            .then(res => {
                let newState = Object.assign({}, this.state);
                newState.isLoaded = true;
                newState.summary = res.data;
                this.setState(newState);

            })
    }

    render() {
        const {summary, isLoaded} = this.state;
        if (!isLoaded) return null;
        return (
            <div className="container">
                <div className="columns">
                    <div className="column">
                        <table>
                            <tr>
                                <td>ID сводки</td>
                                <td>{summary.summaryId}</td>
                            </tr>
                            <tr>
                                <td>Дата</td>
                                <td>{summary.date}</td>
                            </tr>
                            <tr>
                                <td>Количенство тралений</td>
                                <td>{summary.trawlingCount}</td>
                            </tr>
                            <tr>
                                <td>Широта</td>
                                <td>{summary.latitude}</td>
                            </tr>
                            <tr>
                                <td>Долгота</td>
                                <td>{summary.longitude}</td>
                            </tr>
                            <tr>
                                <td>Режим работы</td>
                                <td>{summary.mode}</td>
                            </tr>
                            <tr>
                                <td>Направление</td>
                                <td>{summary.heading}</td>
                            </tr>
                            <tr>
                                <td>Скорость</td>
                                <td>{summary.speed}</td>
                            </tr>
                            <tr>
                                <td colSpan="2">{summary.comments}</td>
                            </tr>
                        </table>
                    </div>
                    <div className="column">
                        <table className="table is-striped is-fullwidth is-bordered">
                            <thead>
                            <tr>
                                <th>Наименование</th>
                                <th>Единицы</th>
                                <th>За день</th>
                                <th>На борту</th>
                            </tr>
                            </thead>
                            <tbody>
                            {summary.summaryRecords.map((item, index) => (
                                <SummaryRecordTableRow key={index} record={item}/>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>

        );
    }

}

