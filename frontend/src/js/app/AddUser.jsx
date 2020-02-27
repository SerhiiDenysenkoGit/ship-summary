import React from 'react';
import {Field} from "./components/Field";
import axios from "axios";
import {createPath} from "../commons";

export class AddUser extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            errorOccurred: false,
            successfullyCreated: false,
            form: {
                username: '',
                firstName: '',
                lastName: '',
                password: '',
                confirmPassword: ''
            },
            validation: {
                username: '',
                firstName: '',
                lastName: '',
                password: '',
                confirmPassword: ''
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.checkUsername = this.checkUsername.bind(this);
        this.handleRoleChange = this.handleRoleChange.bind(this);
    }

    checkUsername() {
        const username = this.state.form.username;
        if (username && username.length > 0) {
            axios.get(createPath('/username/' + this.state.form.username))
                .then(res => {
                    if (res.data === true) {
                        let newState = Object.assign({}, this.state);
                        newState.validation.username = "Имя пользователя уже занято";
                        this.setState(newState);
                    }
                });
        }
    }

    validateForm() {
        const data = this.state.form;
        let successful = true;
        let usernameErr = this.state.validation.username;
        if (usernameErr.length > 0) {
            successful = false;
        }
        if (data.username.length < 4) {
            let newState = Object.assign({}, this.state);
            newState.validation.username = "Имя пользователя должно быть длинее 4 символов";
            this.setState(newState);
            successful = false;
        }
        if (data.password.length < 6) {
            let newState = Object.assign({}, this.state);
            newState.validation.password = "Пароль слишком короткий";
            this.setState(newState);
            successful = false;
        }
        if (data.password !== data.confirmPassword) {
            let newState = Object.assign({}, this.state);
            newState.validation.confirmPassword = "Пароли не совпадают";
            this.setState(newState);
            successful = false;
        }
        return successful;
    }

    handleChange(event) {
        let newState = Object.assign({}, this.state);
        newState.form[event.target.name] = event.target.value;
        newState.validation[event.target.name] = '';
        this.setState(newState);
    }

    handleRoleChange(event) {
        let newState = Object.assign({}, this.state);
        newState.form.role = event.target.value;
        this.setState(newState);
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.validateForm()) {
            axios.post(createPath('/api/users/'), this.state.form)
                .then(res => {
                    this.setState({
                        successfullyCreated: true,
                        selectedRole: {
                            value: 'USER',
                            label: 'Пользователь'
                        },
                        form: {
                            username: '',
                            firstName: '',
                            lastName: '',
                            password: '',
                            confirmPassword: '',
                            role: ''
                        },
                        validation: {
                            username: '',
                            firstName: '',
                            lastName: '',
                            password: '',
                            confirmPassword: '',
                            role: ''
                        },
                        roles: [
                            {value: 'ADMIN', label: 'Администратор'},
                            {value: 'OPERATOR', label: 'Оператор'},
                            {value: 'USER', label: 'Пользователь'}
                        ]
                    });
                })
                .catch(res => this.setState({errorOccurred: true}));
        }
    }

    render() {
        return (
            <div className="columns">
                <div className="column is-half is-offset-one-quarter">
                    <form onSubmit={this.handleSubmit}>
                        <Field name="username"
                               label="Имя пользователя"
                               value={this.state.form.username}
                               errorMsg={this.state.validation.username}
                               onBlur={this.checkUsername}
                               onChange={this.handleChange}/>
                        <Field name="firstName"
                               label="Имя"
                               value={this.state.form.firstName}
                               onChange={this.handleChange}/>
                        <Field name="lastName"
                               label="Фамилия"
                               value={this.state.form.lastName}
                               onChange={this.handleChange}/>
                        <Field name="password"
                               label='Пароль'
                               type="password"
                               value={this.state.form.password}
                               errorMsg={this.state.validation.password}
                               onChange={this.handleChange}/>
                        <Field name="confirmPassword"
                               label='Подтвердите пароль'
                               type="password"
                               value={this.state.form.confirmPassword}
                               errorMsg={this.state.validation.confirmPassword}
                               onChange={this.handleChange}/>

                        <div className="field">
                            <label className="label">Роль</label>
                            <div className="control">
                                <div className="select">
                                    <select value={this.state.form.role} onChange={this.handleRoleChange}>
                                        <option value="USER">Пользователь</option>
                                        <option value="OPERATOR">Оператор</option>
                                        <option value="ADMIN">Админ</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="field is-grouped is-grouped-centered">
                            <p className="control">
                                <button type="submit" className="button is-primary">
                                    Добавить пользователя
                                </button>
                            </p>
                        </div>
                        <div className="field is-grouped is-grouped-centered">
                            <div className="control">
                                { this.state.errorOccurred ? <p className="help is-danger">Ошибка добавления пользователя</p> : null }
                            </div>
                        </div>
                        <div>
                            <div className="control">
                                { this.state.successfullyCreated ? <p className="help is-success">Пользователь успешно создан</p> : null }
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

}