import React from 'react';
import axios from 'axios';
import {createPath} from "../../commons";
import {CommonService} from "../../CommonService";
import {Field} from "../components/Field";
import {SummaryStatsColumn} from "./SummaryStatsColumn";

export class SummaryStats extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            firstStats: {},
            secondStats: {},
            firstFrom: '',
            firstTo: '',
            secondFrom: '',
            secondTo: '',
            isFirstLoaded: false,
            isSecondLoaded: false
        };

        this.handleDateChange = this.handleDateChange.bind(this);
        this.loadStats = this.loadStats.bind(this);
        this.getSummaryByDate = this.getSummaryByDate.bind(this);
    }

    handleDateChange(event) {
        let prevState = Object.assign({}, this.state);
        prevState[event.target.name] = event.target.value;
        this.setState(prevState);
    }

    loadStats() {
        this.getSummaryByDate(true);
        this.getSummaryByDate(false);
    }

    getSummaryByDate(isFirst) {
        const {firstFrom, firstTo, secondFrom, secondTo} = this.state;
        const url = `/api/summaries/stats?from=${isFirst ? firstFrom : secondFrom}&to=${isFirst ? firstTo : secondTo}`;
        axios
            .get(createPath(url), CommonService.getAuthHeaders())
            .then(res => {
                let prevState = Object.assign({}, this.state);
                if (isFirst) {
                    prevState.firstStats = res.data;
                    prevState.isFirstLoaded = true;
                } else {
                    prevState.secondStats = res.data;
                    prevState.isSecondLoaded = true;
                }
                this.setState(prevState);
            })
            .catch(err => {
                let prevState = Object.assign({}, this.state);
                if (isFirst) {
                    prevState.firstStats = {};
                    prevState.isFirstLoaded = false;
                } else {
                    prevState.secondStats = {};
                    prevState.isSecondLoaded = false;
                }
                this.setState(prevState);
            })
    }

    render() {
        const {firstFrom, firstTo, secondFrom, secondTo, isFirstLoaded, isSecondLoaded, firstStats, secondStats} = this.state;

        return (
            <div className="container">
                <div className="columns">
                    <div className="column">
                        <Field value={firstFrom}
                               label="Первый период (от)"
                               type="date"
                               name="firstFrom"
                               onChange={this.handleDateChange}/>
                    </div>
                    <div className="column">
                        <Field value={firstTo}
                               label="Первый период (до)"
                               type="date"
                               name="firstTo"
                               onChange={this.handleDateChange}/>
                    </div>
                    <div className="column">
                        <Field value={secondFrom}
                               label="Второй период (от)"
                               type="date"
                               name="secondFrom"
                               onChange={this.handleDateChange}/>
                    </div>
                    <div className="column">
                        <Field value={secondTo}
                               label="Второй период (до)"
                               type="date"
                               name="secondTo"
                               onChange={this.handleDateChange}/>
                    </div>
                    <div className="column">
                        <br/>
                        <p className="button is-success" onClick={this.loadStats}>Поиск</p>
                    </div>
                </div>
                <div className="columns">
                    <SummaryStatsColumn isLoaded={isFirstLoaded} stats={firstStats}/>
                    <SummaryStatsColumn isLoaded={isSecondLoaded} stats={secondStats}/>
                </div>
            </div>

        );
    }

}

