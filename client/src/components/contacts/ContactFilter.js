import React, { useContext, useRef, useEffect } from 'react'
import contactContext from '../../context/contact/contactContext'

export const ContactFilter = () => {
    const ContactContext = useContext(contactContext);
    const text = useRef();
    
    const { filterContacts, clearFilter, filtered } = ContactContext;
    
    // useEffect(() => {
    //     if(filtered === null) {
    //         text.current.value = '';
    //     }
    // })

    const onChange = (e) => {
        // console.log(`target: ${e.target.value}`);
        // console.log(`ref: ${text.current.value}`);
        if(text.current.value !== '') {
            filterContacts(text.current.value);
        } else {
            clearFilter();
        }
    }

    return (
        <form>
            <input ref={text} type="text" placeholder="Filter Contacts..." onChange={onChange} />
        </form>
    )
}
