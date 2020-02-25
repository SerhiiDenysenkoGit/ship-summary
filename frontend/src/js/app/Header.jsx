import React from "react";
import {CommonService} from "../CommonService";
import {Link} from "react-router-dom";
import NavBarItem from "./components/NavbarItem";

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

        if (isAuthenticated) {
            return (
                <div className='navbar'>
                    <div className="navbar-menu">
                        <div className="navbar-start">
                            <NavBarItem to='/'
                                        title='Сводки'
                                        how={true}/>
                            <NavBarItem to='/ui/summary/add'
                                        title='Добавить сводку'
                                        how={CommonService.hasOperatorRole(currentUser) || CommonService.hasAdminRole(currentUser)}/>
                            <NavBarItem to='/ui/users/add'
                                        title="Добавить пользователя"
                                        show={CommonService.hasAdminRole(currentUser)}/>
                        </div>
                    </div>
                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div>
                                <div className="button is-light">
                                    <Link onClick={HeaderRow.logout} to="/">Выйти</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return null;
        }
    }

}
