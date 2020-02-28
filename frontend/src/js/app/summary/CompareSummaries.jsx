import React from 'react';
import axios from 'axios';
import {createPath} from "../../commons";
import {CommonService} from "../../CommonService";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import {Field} from "../components/Field";
import {ComparisonRow} from "./ComparisonRow";

export class CompareSummaries extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            firstSummary: {},
            secondSummary: {},
            firstDate: '',
            secondDate: '',
            isFirstLoaded: false,
            isSecondLoaded: false
        };

        this.handleDateChange = this.handleDateChange.bind(this);
    }

    handleDateChange(event, isFirst) {
        let prevState = Object.assign({}, this.state);
        prevState[event.target.name] = event.target.value;
        this.setState(prevState);
        this.getSummaryByDate(event.target.value, isFirst);
    }

    getSummaryByDate(date, isFirst) {
        axios
            .get(createPath('/api/summaries/date/' + date), CommonService.getAuthHeaders())
            .then(res => {
                let prevState = Object.assign({}, this.state);
                if (isFirst) {
                    prevState.firstSummary = res.data;
                    prevState.isFirstLoaded = true;
                } else {
                    prevState.secondSummary = res.data;
                    prevState.isSecondLoaded = true;
                }
                this.setState(prevState);
            })
            .catch(err => {
                let prevState = Object.assign({}, this.state);
                if (isFirst) {
                    prevState.firstSummary = {};
                    prevState.isFirstLoaded = false;
                } else {
                    prevState.secondSummary = {};
                    prevState.isSecondLoaded = false;
                }
                this.setState(prevState);
            })
    }

    render() {
        const {firstSummary, secondSummary, firstDate, secondDate, isFirstLoaded, isSecondLoaded} = this.state;

        let firstMapList = [], secondMapList = [];
        if (isFirstLoaded) {
            firstMapList = firstSummary.summaryRecords;
            if (isSecondLoaded) {
                secondMapList = secondSummary.summaryRecords;
            }
        } else {
            if (isSecondLoaded) {
                firstMapList = secondSummary.summaryRecords;
            }
        }
        console.log(firstMapList);
        console.log(secondMapList);
        const mappedRecords = firstMapList.map((item, index) => {
            const arr = secondMapList.filter(sec => sec.name === item.name);
            return (<ComparisonRow key={index} firstRecord={item} secondRecord={arr && arr.length > 0 ? arr[0] : {}}/>)
        });

        return (
            <div className="container">
                <div className="columns">
                    <div className="column">
                        <Field value={firstDate}
                               label="Дата"
                               type="date"
                               name="firstDate"
                               onChange={(event) => this.handleDateChange(event, true)}/>
                    </div>
                    <div className="column">
                        <Field value={secondDate}
                               label="Дата"
                               type="date"
                               name="secondDate"
                               onChange={(event) => this.handleDateChange(event, false)}/>
                    </div>
                </div>
                <div className="columns">
                    <table className="table is-striped is-fullwidth is-bordered">
                        <thead>
                        <th></th>
                        <th>{firstDate}</th>
                        <th>{secondDate}</th>
                        </thead>
                        <tbody>
                        <tr>
                            <td>ID сводки</td>
                            <td>{firstSummary.summaryId}</td>
                            <td>{secondSummary.summaryId}</td>
                        </tr>
                        <tr>
                            <td>Дата</td>
                            <td>{firstSummary.date}</td>
                            <td>{secondSummary.date}</td>
                        </tr>
                        <tr>
                            <td>Количенство тралений</td>
                            <td>{firstSummary.trawlingCount}</td>
                            <td>{secondSummary.trawlingCount}</td>
                        </tr>
                        <tr>
                            <td>Широта</td>
                            <td>{firstSummary.latitude}</td>
                            <td>{secondSummary.latitude}</td>
                        </tr>
                        <tr>
                            <td>Долгота</td>
                            <td>{firstSummary.longitude}</td>
                            <td>{secondSummary.longitude}</td>
                        </tr>
                        <tr>
                            <td>Режим работы</td>
                            <td>{firstSummary.mode}</td>
                            <td>{secondSummary.mode}</td>
                        </tr>
                        <tr>
                            <td>Направление</td>
                            <td>{firstSummary.heading}</td>
                            <td>{secondSummary.heading}</td>
                        </tr>
                        <tr>
                            <td>Скорость</td>
                            <td>{firstSummary.speed}</td>
                            <td>{secondSummary.speed}</td>
                        </tr>
                        <tr>
                            <td>Комментарии</td>
                            <td>{firstSummary.comments}</td>
                            <td>{secondSummary.comments}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>

                <div className="columns">
                    <table className="table is-striped is-fullwidth is-bordered">
                        <thead>
                        <tr>
                            <th>Наименование</th>
                            <th>Первый тур: День</th>
                            <th>Первый тур: Всего</th>
                            <th>Второй тур: День</th>
                            <th>Второй тур: Всего</th>
                        </tr>
                        </thead>
                        <tbody>
                        {mappedRecords}
                        </tbody>
                    </table>
                </div>
                <div className="button is-success exclude-from-pdf" onClick={this.exportToPdf}>
                    Экспорт в PDF
                </div>
            </div>

        );
    }


    exportToPdf() {
        const element = document.getElementById('application');
        html2canvas(element, {
            ignoreElements: function (el) {
                return el.className.indexOf('exclude-from-pdf') !== -1;
            }
        })
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                window.open().document.write('<img src="' + imgData + '" />');
                const pdf = new jsPDF();
                console.log(imgData);
                const imgProps = pdf.getImageProperties(imgData);
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
                pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
                pdf.save('download.pdf');
            });
    }

}

