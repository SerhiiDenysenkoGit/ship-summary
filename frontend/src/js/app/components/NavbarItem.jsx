import {Link} from "react-router-dom";
import React from "react";

const NavBarItem = props => {
    return props.show
        ? (<div className="navbar-item">
                <Link to={props.to}>{props.title}</Link>
            </div>
        ) : null;
};

export default NavBarItem;
