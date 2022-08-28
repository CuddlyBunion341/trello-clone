import React, { useState, useContext } from 'react';
import storeApi from '../../utils/storeApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/fontawesome-free-solid';

const titleStyle = {
    padding: "10px 8px 10px 8px",
    fontWeight: "600",
};

const spanStyle = {
    paddingLeft: "8px",
};

const formStyle = {
    display: "flex",
    justifyContent: "space-between"
};

const inputStyle = {
    width: "100%",
    outline: "none",
    border: "none",
    padding: "7px 8px",
    fontWeight:"600",
    borderRadius: "3px"
};
const iconStyle = {
    marginLeft: "5px",
    color: "gray",
    width:"20px",
    display:"flex",
    justifyContent:"center",
    alignItems:"center"
};

export default function Title({ listId, title }) {
    const [open, setOpen] = useState(false);
    const [newTitle, setTitle] = useState(title);
    const { renameList, deleteList } = useContext(storeApi);

    const handleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const trimmed = newTitle.trim();
        setTitle(trimmed);

        if (trimmed) renameList(listId, trimmed);

        setOpen(false);
    };

    const handleFocus = (e) => e.target.select();

    return (
        <div 
            className="title" 
            style={titleStyle}
            onClick={() => setOpen(true)}
        >
            {open ? (
                <form onSubmit={handleSubmit} style={formStyle}>
                    <input
                        type="text"
                        onBlur={undefined}
                        autoFocus
                        onFocus={handleFocus}
                        value={newTitle}
                        onChange={handleChange}
                        style={inputStyle}
                        className="list-input"
                    />
                    <a onClick={() => deleteList(listId)} style={iconStyle}>
                        <FontAwesomeIcon icon={faTrash} />
                    </a>
                </form>
            ) : (
                <span  style={spanStyle}>{title}</span>
            )}
        </div>

    )

}