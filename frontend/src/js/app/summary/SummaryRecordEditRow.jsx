import React from 'react';
import {Field} from "../components/Field";

export class SummaryRecordEditRow extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        const {handleChange, record} = this.props;

        return (
            <div className="columns">
                <div className="column is-6">
                    <Field value={record.typeName}
                           disabled={true}
                           name="recordType"
                           onChange={(event) => handleChange(event, record.name)}/>
                </div>
                <div className="column is-2">
                    <Field value={record.units}
                           placeholder="Единицы измерения"
                           name="units"
                           onChange={(event) => handleChange(event, record.name)}/>
                </div>
                <div className="column is-2">
                    <Field value={record.day}
                           placeholder="За день"
                           name="day"
                           onChange={(event) => handleChange(event, record.name)}/>
                </div>
                <div className="column is-2">
                    <Field value={record.board}
                           placeholder="На борту"
                           name="board"
                           onChange={(event) => handleChange(event, record.name)}/>
                </div>
            </div>
        );
    }

}