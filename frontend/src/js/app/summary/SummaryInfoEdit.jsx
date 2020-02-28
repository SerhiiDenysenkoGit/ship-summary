import React from 'react';
import {Field} from "../components/Field";
import axios from "axios";
import {createPath} from "../../commons";
import {CommonService} from "../../CommonService";

export class SummaryInfoEdit extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            dateError: false
        };

        this.checkIfDateIsFree = this.checkIfDateIsFree.bind(this);
    }

    checkIfDateIsFree() {
        axios.get(createPath("/api/summaries/exists/" + this.props.summary.date), CommonService.getAuthHeaders())
            .then(res => {
                this.setState({dateError: res.data});
            })
    }

    render() {
        const {handleSummaryFieldChange, summary, dateDisabled} = this.props;
        console.log(this.state);

        return (
            <div className="columns">
                <div className="column is-3">
                    <Field value={summary.date}
                           label="Дата"
                           disabled={dateDisabled}
                           type="date"
                           name="date"
                           onBlur={this.checkIfDateIsFree}
                           errorMsg={this.state.dateError ? "Сводка с такой датой уже существует" : ""}
                           onChange={handleSummaryFieldChange}/>
                    <Field value={summary.trawlingCount}
                           label="Количество тралений"
                           name="trawlingCount"
                           type="number"
                           onChange={handleSummaryFieldChange}/>
                    <Field value={summary.mode}
                           label="Режим работы"
                           name="mode"
                           onChange={handleSummaryFieldChange}/>
                </div>
                <div className="column is-2">
                    <Field value={summary.latitude}
                           label="Широта"
                           name="latitude"
                           type="text"
                           onChange={handleSummaryFieldChange}/>
                    <Field value={summary.longitude}
                           label="Долгота"
                           name="longitude"
                           type="text"
                           onChange={handleSummaryFieldChange}/>
                </div>
                <div className="column is-2">
                    <Field value={summary.speed}
                           label="Скорость"
                           name="speed"
                           type="text"
                           onChange={handleSummaryFieldChange}/>
                    <Field value={summary.heading}
                           label="Направление"
                           name="heading"
                           type="text"
                           onChange={handleSummaryFieldChange}/>
                </div>
                <div className="column">
                    <Field value={summary.comments}
                           label="Комментарии"
                           name="comments"
                           type="textarea"
                           onChange={handleSummaryFieldChange}/>
                </div>
            </div>
        );
    }

}