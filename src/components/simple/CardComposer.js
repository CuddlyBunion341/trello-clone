import React, { useState, useRef, useContext } from 'react';
import storeApi from '../../utils/storeApi';

const openComposerStyle = {
    color: "#5e6c84",
    margin: "2px 0 2px 0px",
    padding:"4px 8px",
    borderRadius:"3px",
    "&:hover": {
        backgroundColor: "#091e4214"
    }
};

const plusIconStyle = {
    padding:"2px"
};

const cardStyle = {
    padding: "6px 8px 6px",
    marginBottom:"8px",
    backgroundColor:"#FFF",
    borderRadius:"3px",
    boxShadow:"0 1px 0 #091e4240",
    cursor:"pointer",
    maxWidth:"300px"
};

const addCardStyle = {
   backgroundColor: "#0079bf",
   border: "none",
   boxShadow: "none",
   color:"#fff",
   padding:"7.5px 12px",
   borderRadius: "3px",
   fontSize:"14px"
};

const areaStyle = {
    resize: "none",
    width: "100%",
    outline:"none",
    border:"none",
    overflowWrap:"break-wokd",
    overflow:"hidden",
    height: "54px",
    maxHeight: "160px",
    fontSize: "14px"
};

const closeStyle = {
    border: "none",
    outline: "none",
    color: "#6b778c",
    fontSize: "24px",
    height: "32px",
    width: "32px",
    fontWeight: "400",
    verticalAlign: "center",
    padding: "0"
};

const composerStyle = {
    padding: "0 4px 8px",
    margin: "0 4px",
    // marginTop:"-50px"
};

const controlsStyle = {
    display: "flex",
    alignItems:"center"
};

export default function CardComposer({ listId }) {
    const [title, setTitle] = useState('');
    const [open, setOpen] = useState(false);
    const composerRef = useRef(null);

    const { addCard } = useContext(storeApi);

    const handleSubmit = () => {
        const trimmed = title.trim();
        // console.log(!!title,title,!!trimmed,trimmed)
        if (trimmed) addCard(trimmed, listId);

        setTitle('');
    };

    const handleChange = (event) => {
        const newTitle = event.target.value;
        setTitle(newTitle);
    };

    const handleCancel = () => {
        setTitle('');
        closeComposer();
    };

    const closeComposer = () => setOpen(false);
    const openComposer = () => setOpen(true);

    const handleKeyUp = (event) => {
        if (event.keyCode === 13) {
            event.preventDefault();
            handleSubmit();
        }
    }

    return (
        <div className="card-composer" style={composerStyle} ref={composerRef}>
            {open ? (
                <>
                    <div className="list-card" style={cardStyle}>
                        <textarea
                            onChange={handleChange}
                            value={title}
                            style={areaStyle}
                            autoFocus
                            placeholder="Enter a title for this card..."
                            onKeyUp={handleKeyUp}
                            onKeyDown={handleKeyUp}
                        />
                    </div>
                    <div className="composer-controls" style={controlsStyle}>
                        <button 
                            className="add-card" 
                            style={addCardStyle} 
                            onClick={handleSubmit}
                        >Add card</button>
                        <button 
                            className="close-card" 
                            style={closeStyle} 
                            onClick={handleCancel}>
                        ✕</button> {/* &#x2715; */}
                    </div>
                </>
            ):(
                <div 
                    className="open-card-composer" 
                    style={openComposerStyle} 
                    onClick={openComposer}
                >
                    <span className="plusIcon" style={plusIconStyle}>+</span>
                    Add a card {/* ToDo: turn this into span */}
                </div>
            )}
        </div>
    );
};