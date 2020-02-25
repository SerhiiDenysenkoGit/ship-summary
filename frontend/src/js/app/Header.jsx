import React from "react";
import {CommonService} from "../CommonService";
import {Anchor, Box, Header} from "grommet";
import {Link} from "react-router-dom";

export class HeaderRow extends React.Component {

    constructor(props) {
        super(props);

    }

    static logout() {
        CommonService.resetToken();
        location.replace('/');
    }

    render() {
        const {isAuthenticated, currentUser} = this.props;

        console.log(currentUser);

        if (isAuthenticated) {
            return (
                <Header background="light-4" pad="small">
                    <Box direction="row" gap="medium">
                        {CommonService.hasAdminRole(currentUser) ?
                            <Link to="/ui/user/add">
                                <Anchor label="Добавить пользователя"/>
                            </Link> : null
                        }
                        {CommonService.hasAdminRole(currentUser) || CommonService.hasOperatorRole(currentUser) ?
                            <Link to="/ui/summary/add">
                                <Anchor label="Добавить сводку"/>
                            </Link> : null
                        }
                        <Link to="/ui/summary/list">
                            <Anchor label="Сводки"/>
                        </Link>
                    </Box>
                </Header>
            );
        } else {
            return null;
        }
    }

}
