import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import contactContext from '../../context/contact/contactContext';

export const ContactItem = ({ contact }) => {
    const ContactContext = useContext(contactContext)
    const{ deleteContact, setCurrent, clearCurrent }= ContactContext;

    const { _id, name, email, phone, type } = contact;

    const onEdit = () => {
        setCurrent(contact);
    }

    const onDelete = () => {
        deleteContact(_id);
        clearCurrent();
    }

    return (
        <div className="card bg-light">
            <h3 className="text-primary text-left">
                {name}{' '}
                <span className={'bagde ' + (type === 'professional' ? 'badge-success' : 'badge-primary')}>
                    { type.charAt(0).toUpperCase() + type.slice(1) }
                </span>
            </h3>
            <ul className="list">
                {phone && (
                    <li>
                        <i className="fas fa-phone" /> { phone }
                    </li>
                )}
                {email && (
                    <li>
                        <i className="fas fa-envelope" /> { email }
                    </li>
                )}
            </ul>
            <p>
                <button className="btn btn-dark btn-sm" onClick={onEdit}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={onDelete}>Delete</button>
            </p>
        </div>
    )
}

ContactItem.prpoTypes = {
    contact: PropTypes.object.isRequired,
}