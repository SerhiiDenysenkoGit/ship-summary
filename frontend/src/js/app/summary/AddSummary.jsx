import React from 'react';
import {SummaryInfoEdit} from "./SummaryInfoEdit";
import {SummaryRecordEditRow} from "./SummaryRecordEditRow";
import axios from 'axios';
import {createPath} from "../../commons";
import {CommonService} from "../../CommonService";
import {Notification} from "../components/Notification";

export class AddSummary extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            recordsTypes: [],
            summary: this.prepareEmptySummary(),
            showSuccess: false,
            showError: false
        };

        this.handleSummaryFieldChange = this.handleSummaryFieldChange.bind(this);
        this.handleRecordChange = this.handleRecordChange.bind(this);
        this.addSummary = this.addSummary.bind(this);
        this.fillRecordsData = this.fillRecordsData.bind(this);
        this.closeSuccessMsg = this.closeSuccessMsg.bind(this);
        this.closeErrorMsg = this.closeErrorMsg.bind(this);
    }

    render() {
        const {summary, showSuccess, showError} = this.state;

        return (
            <div className="container">
                {showSuccess ?
                    <Notification
                        message={'Сводка добавлена успешно'}
                        type="is-success"
                        closeHandler={this.closeSuccessMsg}/> : null}
                {showError ?
                    <Notification
                        message={'Ошибка сохранения. Проверьте, что все поля введены верно'}
                        type="is-danger"
                        closeHandler={this.closeErrorMsg}/> : null}
                <div className="title is-3">Введите данные сводки:</div>
                <SummaryInfoEdit summary={summary} handleSummaryFieldChange={this.handleSummaryFieldChange}/>
                {summary.summaryRecords.map((record, index) =>
                    (
                        <SummaryRecordEditRow key={index} record={record} handleChange={this.handleRecordChange}/>
                    )
                )}
                <div className="field is-grouped is-grouped-centered" style={{"marginBottom": "50px"}}>
                    <p className="control">
                        <button type="submit" className="button is-primary" onClick={this.addSummary}>
                            Добавить сводку
                        </button>
                    </p>
                </div>
            </div>

        );
    }

    prepareEmptySummary() {
        return {
            date: '',
            trawlingCount: '',
            longitude: '',
            latitude: '',
            mode: '',
            speed: '',
            heading: '',
            comments: '',
            summaryRecords: []
        }
    }

    componentDidMount() {
        axios
            .get(createPath("/api/summaries/records/types"), CommonService.getAuthHeaders())
            .then(res => {
                let newState = Object.assign({}, this.state);
                newState.recordsTypes = res.data;
                this.setState(newState);
                this.fillRecordsData();
            })
    }

    fillRecordsData() {
        let records = this.state.recordsTypes.map(type => {
            return {
                name: type.typeEnum,
                typeName: type.typeName,
                units: '',
                day: '',
                board: ''
            }
        });
        let newState = Object.assign({}, this.state);
        newState.summary.summaryRecords = records;
        this.setState(newState);

    }

    handleRecordChange(event, typeEnum) {
        let newState = Object.assign({}, this.state);
        newState.summary.summaryRecords
            .filter(record => record.name === typeEnum)
            .forEach(record => {
                record[event.target.name] = event.target.value
            });
        this.setState(newState);
    }

    handleSummaryFieldChange(event) {
        let newState = Object.assign({}, this.state);
        newState.summary[event.target.name] = event.target.value;
        this.setState(newState);
    }

    closeSuccessMsg() {
        this.setState({"showSuccess": false})
    }

    closeErrorMsg() {
        this.setState({"showError": false})
    }

    addSummary() {
        axios
            .post(createPath("/api/summaries/"), this.state.summary, CommonService.getAuthHeaders())
            .then(res => {
                let prevState = this.state;
                prevState.showSuccess = true;
                prevState.summary = this.prepareEmptySummary();
                this.fillRecordsData();
                this.setState(prevState);
            })
            .catch(res => {
                let prevState = this.state;
                prevState.showError = true;
                this.setState(prevState);
            })
    }

}

