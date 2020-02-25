import React from 'react';
import {UnauthenticatedContent} from "./UnauthenticatedContent";
import {Anchor, Box, Grommet} from 'grommet';
import {CommonService} from "../CommonService";
import {AuthenticatedContent} from "./AuthenticatedContent";
import {HeaderRow} from "./Header";
import {Link} from "react-router-dom";
import axios  from "axios";
import {createPath} from "../commons";

export class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isAuthenticated: false
        }
    }

    componentDidMount() {
        if (CommonService.tokenExists()) {
            const config = CommonService.getAuthHeaders();
            axios.get(createPath('/api/users/current'), config)
                .then(res => {
                    this.setState({
                        isLoaded: true,
                        currentUser: res.data,
                        isAuthenticated: true
                    });
                })
                .catch(res => {
                    CommonService.resetToken();
                    this.setState({
                        isLoaded: true,
                        isAuthenticated: false
                    });
                });
        } else {
            this.setState({isLoaded: true});
        }
    }

    render() {
        const {isAuthenticated, currentUser} = this.state;
        console.log(this.state);
        return (
            <div className="container">
                <HeaderRow isAuthenticated={isAuthenticated} currentUser={currentUser}/>
                {isAuthenticated
                    ? <AuthenticatedContent/>
                    : <UnauthenticatedContent/>}
            </div>
        );
    }

}
