import React from "react";
import {Field} from "./components/Field";
import axios from "axios";
import {Notification} from "./components/Notification";
import {CommonService} from "../CommonService";

export class Cabinet extends React.Component {

    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            currentUser: props.currentUser,
            passwordChange: {
                oldPassword: '',
                newPassword: '',
                confirmPassword: ''
            },
            oldPasswordError: '',
            emptyPasswordError: '',
            passwordDoNotMatchError: '',
            passwordSuccessfullyChanged: false,
            passwordChangeError: false
        };

        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handlePasswordUpdate = this.handlePasswordUpdate.bind(this);
        this.validatePasswordChange = this.validatePasswordChange.bind(this);
        this.closePwdChangeSuccess = this.closePwdChangeSuccess.bind(this);
        this.closePwdChangeError = this.closePwdChangeError.bind(this);
        this.closeChangeSuccess = this.closeChangeSuccess.bind(this);
    }

    render() {
        const {currentUser, passwordChange, passwordSuccessfullyChanged, passwordChangeError } = this.state;

        return (
            <div className="columns">
                <div className="column">
                    <Field value={currentUser.username}
                           disabled={true}
                           label="Имя пользователя"
                           name="username"/>
                    <Field value={currentUser.firstName}
                           disabled={true}
                           label="Имя"
                           name="firstName"/>
                    <Field value={currentUser.lastName}
                           disabled={true}
                           label="Фамилия"
                           name="lastName"/>
                </div>
                <div className="column">
                    <Field value={passwordChange.oldPassword}
                           label="Старый пароль"
                           name="oldPassword"
                           type="password"
                           onChange={this.handlePasswordChange}
                           errorMsg={this.state.oldPasswordError}/>
                    <Field value={passwordChange.newPassword}
                           label="Новый пароль"
                           name="newPassword"
                           type="password"
                           onChange={this.handlePasswordChange}
                           errorMsg={this.state.emptyPasswordError}/>
                    <Field value={passwordChange.confirmPassword}
                           label="Подтвердите пароль"
                           name="confirmPassword"
                           type="password"
                           onChange={this.handlePasswordChange}
                           errorMsg={this.state.passwordDoNotMatchError}/>
                    <div className="field is-grouped is-grouped-centered">
                        <p className="control">
                            <button onClick={this.handlePasswordUpdate} className="button is-primary">Сохранить</button>
                        </p>
                    </div>
                    {passwordSuccessfullyChanged
                        ? <Notification type="is-success"
                                        message="Пароль успешно изменен"
                                        closeHandler={this.closePwdChangeSuccess}/>
                        : null}

                    {passwordChangeError
                        ? <Notification type="is-danger"
                                        message="Не удалось изменить пароль. Старый пароль введен неверно."
                                        closeHandler={this.closePwdChangeError}/>
                        : null}
                </div>
            </div>
        );
    }

    closeChangeSuccess() {
        this.setState({editSuccessful: false});
    }

    closePwdChangeSuccess() {
        this.setState({passwordSuccessfullyChanged: false});
    }

    closePwdChangeError() {
        this.setState({passwordChangeError: false});
    }

    handlePasswordChange(event) {
        let pwd = {...this.state.passwordChange};
        pwd[event.target.name] = event.target.value;
        this.setState({
            passwordChange: pwd,
            oldPasswordError: '',
            emptyPasswordError: '',
            passwordDoNotMatchError: ''
        });
    }

    validatePasswordChange() {
        const pwd = this.state.passwordChange;
        let successful = true;
        if (pwd.oldPassword.length === 0) {
            this.setState({
                oldPasswordError: "Старый пароль не должен быть пустым"
            });
            successful = false;
        }
        if (pwd.newPassword.length === 0) {
            this.setState({
                emptyPasswordError: "Новый проль не может быть пустым"
            });
            successful = false;
        }
        if (pwd.newPassword !== pwd.confirmPassword) {
            this.setState({
                passwordDoNotMatchError: "Пароль не совпадают"
            });
            successful = false;
        }
        return successful;
    }

    handlePasswordUpdate() {
        if (this.validatePasswordChange()) {
            axios.put('/api/users/password', this.state.passwordChange, CommonService.getAuthHeaders())
                .then(res => {
                    this.setState({
                        passwordSuccessfullyChanged: true,
                        passwordChange: {
                            oldPassword: '',
                            newPassword: '',
                            confirmPassword: ''
                        }
                    });
                })
                .catch(res => this.setState({passwordChangeError: true}));
        }
    }

}
