import React from 'react';
import axios from 'axios';
import {SummaryTableRow} from "./SummaryTableRow";
import {createPath} from "../../commons";
import {CommonService} from "../../CommonService";
import {Field} from "../components/Field";

export class SummaryList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            summaries: [],
            date: '',
            currentPage: 0,
            pageSize: 10,
            pages: []
        };

        this.fetchSummaries = this.fetchSummaries.bind(this);
        this.loadPage = this.loadPage.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.performRemove = this.performRemove.bind(this);
    }

    componentDidMount() {
        this.fetchSummaries();
    }

    loadPage(event) {
        const parentElement = event.target.parentElement;

        for (let i = 0; i < parentElement.childElementCount; ++i) {
            parentElement.children[i].classList.remove("is-primary")
        }
        event.target.classList.add("is-primary");
        let prevState = this.state;
        prevState.currentPage = (+event.target.innerHTML - 1);
        this.setState({prevState});

        this.fetchSummaries('');
    }

    fetchSummaries(date) {
        const {currentPage, pageSize} = this.state;

        axios
            .post(createPath('/api/summaries/search'), {date: date, pageSize: pageSize, page: currentPage}, CommonService.getAuthHeaders())
            .then(res => {
                this.setState({summaries: res.data.summaries, pages: SummaryList.generatePageArray(res.data.totalPages)});
            })
    }

    static generatePageArray(size) {
        let result = [];
        for (let i = 1; i <= size; ++i) {
            result.push(i);
        }
        return result;
    }

    handleDateChange(event) {
        this.setState({'date': event.target.value});
        this.fetchSummaries(event.target.value);
    }

    performRemove(event, summaryId) {
        axios.delete(createPath("/api/summaries/" + summaryId), CommonService.getAuthHeaders())
            .then(res => {
                this.fetchSummaries(this.state.date);
            })
            .catch(err => window.alert("Ошибка удаления."))
    }

    render() {
        const {summaries, pages, currentPage, date} = this.state;

        const buttons = (
            <div className="buttons">
                <div className="button">Страницы:</div>
                {pages ? pages.map((page, inx) => <div key={page + "-" + pages.length + "-" + Math.random()}
                                                       className={inx === currentPage ? "button is-primary" : 'button'}
                                                       onClick={this.loadPage}>{page}</div>) : ''}
            </div>
        );

        return (
            <div className="container">
                <div className="columns">
                    <div className="column">
                        <Field value={date}
                               label="Дата"
                               type="date"
                               name="date"
                               onChange={(event) => this.handleDateChange(event, true)}/>
                    </div>
                </div>
                <table className="table is-striped is-fullwidth is-bordered">
                    <thead>
                    <tr>
                        <th>ID сводки</th>
                        <th>Дата</th>
                        <th>Количество тралений</th>
                        <th>Широта</th>
                        <th>Долгота</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {summaries.map((item, index) => (
                        <SummaryTableRow key={index} summary={item} performRemove={this.performRemove}/>
                    ))}
                    </tbody>
                </table>
                {buttons}
            </div>
        );
    }

}
