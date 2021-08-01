import React, { useContext, Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import AuthContext from '../../context/auth/authContext';
import ContactContext from '../../context/contact/contactContext';

export const Navbar = ({ title, icon }) => {
    const authContext = useContext(AuthContext);
    const contactContext = useContext(ContactContext);

    const { isAuthenticated, user, logout } = authContext; 
    const { clearContacts } = contactContext;
    
    const onLogout = () => {
        logout();
        clearContacts();
    };

    const authLinks = (
        <Fragment>
            <li>
                Hello {user && user.name}
            </li>
            <li>
                <Link onClick={onLogout} to="/">
                    <i className="fas fa-sign-out-alt" /> <span className="hide-sm">Logout</span>
                </Link>
            </li>
        </Fragment>
    )

    const guestLinks = (
        <Fragment>
            <li>
                <Link to="/register">Register</Link>
            </li>
            <li>
                <Link to="/login">Login</Link>
            </li>
        </Fragment>
    )

    return (
        <div className="navbar bg-primary">
            <h1>
                <i className={ icon } /> <Link to="/">{ title }</Link>
            </h1>
            <ul>
                {isAuthenticated ? authLinks : guestLinks}
            </ul>
        </div>
    )
}

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string,
}

Navbar.defaultProps = {
    title: 'ContactKeeper',
    icon: 'fas fa-id-card-alt'
}