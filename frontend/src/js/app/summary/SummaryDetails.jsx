import React from 'react';
import axios from 'axios';
import {createPath} from "../../commons";
import {CommonService} from "../../CommonService";
import {SummaryRecordTableRow} from "./SummaryRecordTableRow";
import {Link} from "react-router-dom";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

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
                            <tbody>
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
                            </tbody>
                        </table>
                        <div className="button is-success">
                            <Link to={'/ui/summaries/edit/' + summary.summaryId}>Изменить детали</Link>
                        </div>
                        <div className="button is-success" onClick={this.exportToPdf}>
                            Экспорт в PDF
                        </div>
                    </div>
                    <div className="column">
                        <table>
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

    exportToPdf() {
        const element = document.getElementById('application');
        html2canvas(element, {
            windowWidth: element.scrollWidth,
            windowHeight: element.scrollHeight,
            ignoreElements: function(el) {
                console.log(el.class);
                console.log(el.className);
            }
        })
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');

                const pdf = new jsPDF({orientation: 'landscape'});
                pdf.addImage(imgData, 'PNG', 0, 0);
                pdf.save("download.pdf");
            })
        ;
    }

}

