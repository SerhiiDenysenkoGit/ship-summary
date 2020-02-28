import React from 'react';
import { Switch, Route } from 'react-router-dom';
import {SummaryList} from "./summary/SummaryList";
import {AddUser} from "./AddUser";
import {AddSummary} from "./summary/AddSummary";
import {Cabinet} from "./Cabinet";
import {SummaryDetails} from "./summary/SummaryDetails";
import {EditSummary} from "./summary/EditSummary";

export class AuthenticatedContent extends React.Component {

    render() {
        return (
            <div className="content contentWrapper">
                <Switch>
                    <Route exact path='/' component={(props) => <SummaryList {...props} currentUser={this.props.currentUser}/>}/>
                    <Route path='/ui/summary/add' component={(props) => <AddSummary {...props}/>}/>
                    <Route path='/ui/summary/:id' component={(props) => <SummaryDetails {...props}/>}/>
                    <Route path='/ui/summaries/edit/:id' component={(props) => <EditSummary {...props}/>}/>
                    <Route path='/ui/users/add' component={(props) => <AddUser {...props}/>}/>
                    <Route path='/ui/users/profile' component={(props) => <Cabinet {...props} currentUser={this.props.currentUser}/>}/>
                </Switch>
            </div>
        );
    }
}
