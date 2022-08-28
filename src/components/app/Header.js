import React from 'react';

const headerStyle = {
    height: "75px",
    backgroundColor:"#0C3953",
    color:"white",
    fontSize:"25px",
    fontWeight:"bold",
    display:"flex",
    justifyContent:"center",
    alignItems:"center"
};

export default function Header() {
    return (
        <header style={headerStyle}>
            Trello Clone
        </header>
    )
}