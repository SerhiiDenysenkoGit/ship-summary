import React from 'react';
import {SummaryInfoEdit} from "./SummaryInfoEdit";
import {SummaryRecordEditRow} from "./SummaryRecordEditRow";
import axios from 'axios';
import {createPath} from "../../commons";
import {CommonService} from "../../CommonService";
import {Notification} from "../components/Notification";

export class EditSummary extends React.Component {

    constructor(props) {
        super(props);

        console.log(this.props);

        this.state = {
            showSuccess: false,
            showError: false,
            isLoaded: false
        };

        this.handleSummaryFieldChange = this.handleSummaryFieldChange.bind(this);
        this.handleRecordChange = this.handleRecordChange.bind(this);
        this.closeSuccessMsg = this.closeSuccessMsg.bind(this);
        this.closeErrorMsg = this.closeErrorMsg.bind(this);
        this.editSummary = this.editSummary.bind(this);
    }

    componentDidMount() {
        axios
            .get(createPath("/api/summaries/" + this.props.match.params.id), CommonService.getAuthHeaders())
            .then(res => {
                let newState = Object.assign({}, this.state);
                newState.isLoaded = true;
                newState.summary = JSON.parse(JSON.stringify(res.data).replace(/\:null/gi, "\:\"\""));
                this.setState(newState);
            })
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

    render() {
        const {summary, showSuccess, showError, isLoaded} = this.state;

        if (!isLoaded) return null;

        return (
            <div className="container">
                {showSuccess ?
                    <Notification
                        message={'Сводка добавлена успешно'}
                        type="is-success"
                        closeHandler={this.closeSuccessMsg}/> : null}
                {showError ?
                    <Notification
                        message={'Ошибка созранения. Проерьте, что все поля введены верно'}
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
                        <button type="submit" className="button is-primary" onClick={this.editSummary}>
                            Сохранить изменения
                        </button>
                    </p>
                </div>
            </div>

        );
    }

    editSummary() {
        axios
            .post(createPath("/api/summaries/"), this.state.summary, CommonService.getAuthHeaders())
            .then(res => {
                let prevState = this.state;
                prevState.showSuccess = true;
                prevState.showError = false;
                prevState.summary = this.prepareEmptySummary();
                this.setState(prevState);
            })
            .catch(error => {
                console.log(error.response);
                let prevState = this.state;
                prevState.showError = true;
                this.setState(prevState);
            });

    }

}

