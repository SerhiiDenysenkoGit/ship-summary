import React from 'react';
import { Switch, Route } from 'react-router-dom';
import {SummaryList} from "./SummaryList";
import {AddUser} from "./AddUser";
import {AddSummary} from "./AddSummary";

export class AuthenticatedContent extends React.Component {

    render() {
        return (
            <div className="content contentWrapper">
                <Switch>
                    <Route exact path='/' component={(props) => <SummaryList {...props} currentUser={this.props.currentUser}/>}/>
                    <Route path='/ui/summary/add' component={(props) => <AddSummary {...props}/>}/>
                    <Route path='/ui/users/add' component={(props) => <AddUser {...props}/>}/>
                </Switch>
            </div>
        );
    }
}
