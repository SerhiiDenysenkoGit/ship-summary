import React from 'react';
import {Box, Button, Form, FormField, Main} from "grommet";
import axios from 'axios';
import {CommonService} from "../CommonService";
import {createPath} from "../commons";

export class UnauthenticatedContent extends React.Component {


    constructor(props, context) {
        super(props, context);

        this.submit = this.submit.bind(this);
    }

    render() {
        return (
            <Main pad="large">
                <Box
                    direction="column"
                    border={{color: 'brand', size: 'small'}}
                    pad="medium"
                    alignContent="center"
                    align="center"
                    alignSelf="center"
                    width="medium"
                >
                    <Form onSubmit={({value}) => this.submit(value)}>
                        <FormField name="username" label="Имя пользователя"/>
                        <FormField name="password" label="Пароль" type="password"/>
                        <Button type="submit" alignSelf="center" primary label="Логин"/>
                    </Form>
                </Box>
            </Main>


        );
    }

    submit(form) {
        axios.post(createPath('/login'), form)
            .then(res => {
                CommonService.addToken(res.data.token);
                console.log("Result:");
                console.log(res);
                //window.location.reload();
            })
            .then(res => {
                window.location.reload();
            })
            .catch(res => this.setState({invalidCredentials: true}))
    }
}
