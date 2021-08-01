import React, { Fragment, useContext, useEffect } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import ContactContext from '../../context/contact/contactContext'
import AuthContext from '../../context/auth/authContext'
import { ContactItem } from './ContactItem';
import Spinner from '../layout/Spinner';

export const Contacts = () => {
    const contactContext = useContext(ContactContext);
    const authContext = useContext(AuthContext);

    const { contacts, filtered, getContacts, loading } = contactContext;

    useEffect(() => {
            getContacts();

        //eslint-disable-next-line
    }, [])

    if(contacts !== null && contacts.length === 0 && !loading) {
        return <h4>Please Add a Contact...</h4>
    } else {
        return (
            <Fragment>
                {contacts !== null && !loading ? (
                    <TransitionGroup>
                    {filtered !== null ? filtered.map(contact => (
                        <CSSTransition key={contact.id} timeout={500} classNames="item">
                            <ContactItem contact={contact} key={contact.id} />
                        </CSSTransition>
                    ))
                    : contacts.map(contact => (
                        <CSSTransition key={contact.id} timeout={500} classNames="item">
                            <ContactItem contact={contact} />
                        </CSSTransition>
                        ))}
                </TransitionGroup>
                ) : <Spinner />}
            </Fragment>
        )
    }

}
