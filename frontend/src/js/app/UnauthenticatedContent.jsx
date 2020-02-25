import React from 'react';
import axios from 'axios';
import {CommonService} from "../CommonService";
import {createPath} from "../commons";
import {Field} from "./components/Field";

export class UnauthenticatedContent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            invalidCredentials: false,
            username: "",
            password: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        axios.post(createPath('/login'), this.state)
            .then(res => {
                CommonService.addToken(res.data.token);
                location.replace("/");
            })
            .catch(res => this.setState({invalidCredentials: true}))
    }

    render() {
        return (
            <div className="columns">
                <div className="column is-4 is-offset-4">
                    <form onSubmit={this.handleSubmit}>
                        <Field name='username'
                               label='Имя пользователя'
                               placeholder='Введите имя пользователя'
                               value={this.state.username}
                               onChange={this.handleChange}/>
                        <Field name="password"
                               label='Пароль'
                               placeholder='Введите пароль'
                               type="password"
                               value={this.state.password}
                               onChange={this.handleChange}/>
                        <div className="field is-grouped is-grouped-centered">
                            <p className="control">
                                <button type="submit" className="button is-primary">
                                    Логин
                                </button>
                            </p>
                        </div>
                        <div className="field is-grouped is-grouped-centered">
                            <p className="control">
                               { this.state.invalidCredentials ? <p className="help is-danger">Неправильный логин или пароль</p> : null }
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

}
