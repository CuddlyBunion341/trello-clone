import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPen} from '@fortawesome/free-solid-svg-icons'

const cardStyle = {
    padding: "6px 8px 6px",
    marginBottom:"8px",
    backgroundColor:"#FFF",
    borderRadius:"3px",
    boxShadow:"0 1px 0 #091e4240",
    cursor:"pointer",
    maxWidth:"300px",
    wordBreak: "break-word",
    display:"flex",
    justifyContent:"space-between"
};

const iconStyle = {
    alignSelf:"flex-end",
    color:"gray"
};

export default function Card({ card, listId }) {

    const [open,setOpen] = useState(false);

    const handleClick = (event) => {
        console.log("click :)")
    };

    return (
        <div className="card" style={cardStyle}>
            {card.title} {/* ToDo Add textarea */}
            <span className="editCard" style={iconStyle} onClick={handleClick}>
                {/* <FontAwesomeIcon icon="fa-solid fa-pen" /> */}
                <FontAwesomeIcon icon={faPen} />
            </span>
        </div>
    );
}