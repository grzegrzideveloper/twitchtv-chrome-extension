import React from "react";

const NavBar = ({onNavBarClick})=>{
    return (
        <ul className="nav navbar-dark nav-tabs justify-content-center" onClick={onNavBarClick}>
            <li className="nav-item">
                <button id="curr-user" className="nav-link active text-dark">Current User</button>
            </li>
            <li className="nav-item ">
                <button id="bttv" className="nav-link text-light" >Bttv Emotes</button>
            </li>
            <li className="nav-item">
                <button id="ffz" className="nav-link text-light" >Ffz Emotes</button>
            </li>
        </ul>
    );
};

export default NavBar;