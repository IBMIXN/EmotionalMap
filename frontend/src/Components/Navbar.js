import React from "react";
import {Link} from "react-router-dom"

import "../index.css";


function Navbar(props) {
  return (
    <div class="navbar-container">
        <div className="dark-grey navbar">
        
            <Link to='/'>
            <h1 className = "title main-title blue">Emotional Map</h1>
            </Link>
            <Link to='/settings'>
            <img className="white settings-icon" src="/settings-24px.svg" alt="Settings Icon"></img>
            </Link>
          
          
        </div>
    </div>
  );
}

export default Navbar;