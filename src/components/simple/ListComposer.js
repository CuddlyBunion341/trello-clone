import React, { useState, useRef, useContext } from 'react';
import storeApi from '../../utils/storeApi';

const normalComposerStyle = {
    borderRadius: "3px",
    padding: "4px",
    width: "270px",
    fontSize: "14px",
    backgroundColor: "rgb(235, 236, 240)",
    height: "100%"
};

const openComposerStyle = {
    // backgroundColor: "#ebecf0",
    width: "270px",
    borderRadius: "3px",
    height: "auto",
    minHeight: "32px",
    padding: "4px"
};

const openComposerStyleBtn = {
    color: "#fff",
    padding: "6px 8px",
    backgroundColor: "#ffffff3d",
    borderRadius: "3px",
};

const inputStyle = {
    padding:"8px 12px",
    display:"block",
    width:"100%",
    boxSizing:"border-box",
    fontSize:"14px",
    lineHeight:"20px",
    // color: "rgb(200, 196, 189)",
    // backgroundColor:"rgb(24, 26, 27)",
    border:"none",
    outline:"none",
    borderRadius:"3px"
};

const submitStyle = {
    backgroundColor:"#0079bf",
    color:"#fff",
    border:"none",
    padding:"7.5px 12px",
    fontSize:"14px",
    borderRadius:"3px"
};

const controlStyle = {
    margin:"4px 0 0",
    display:"flex"
};

const resetButtonStyle = {
    // width: "32px",
    // height: "32px",
    // border: "none",
    // fontSize:"24px",
    // fontWeight:"600"

  border: "none",
  outline: "none",
  color: "rgb(107, 119, 140)",
  fontSize: "24px",
  height: "32px",
  width: "32px",
  fontWeight: "400",
  padding: "0px",
  backgroundColor:"#0000"
};


export default function ListComposer() {
    const [name, setName] = useState('');
    const [open, setOpen] = useState(false);
    const composerRef = useRef(null);


    const { addList } = useContext(storeApi);

    const openComposer = () => setOpen(true);
    const closeComposer = () => setOpen(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        const trimmed = name.trim();
        if (trimmed) addList(trimmed)
        setName('');
    };

    const handleChange = (event) => {
        const newName = event.target.value;
        setName(newName);
    };

    const handleBlur = (event) => {
        console.log({ event }, "Focus in or out... idk")
    };

    // todo: fix onblur event
    // https://stackoverflow.com/questions/38019140/react-and-blur-event
    const onBlur = (e) => {
        if (!e.currentTarget.contains(document.activeElement)) {
            setOpen(false);
        }
    }
    return open ? (
        <div
            className="list-composer"
            style={normalComposerStyle}
            ref={composerRef}
        >
            <form onSubmit={handleSubmit} tabIndex="0">
                <input
                    type="text"
                    className="list-name-input"
                    autoFocus
                    placeholder="Enter list title..."
                    onChange={handleChange}
                    value={name}
                    style={inputStyle}
                />
                <div className="controls" style={controlStyle}>
                    <button type="submit" style={submitStyle}>Add list</button>
                    <button type="reset" onClick={closeComposer} style={resetButtonStyle}>✕</button>
                </div>
            </form>
        </div>
    ) : (
        <div
            className="list-composer"
            style={openComposerStyle}
        >
            <div
                className="open-list-composer"
                onClick={openComposer}
                style={openComposerStyleBtn}
            >
                <span className="plusIcon">+</span>
                Add another list
            </div>
        </div>
    );
}