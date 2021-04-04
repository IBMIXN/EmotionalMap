import React from "react";


import "../index.css";


function Card(props) {
  return (
    <div class="navbar-container">
        <div className="dark-grey navbar">
            <h1 className = "title main-title blue">Emotional Map</h1>
            <img className="white settings-icon" src="/settings-24px.svg" alt="Settings Icon"></img>
        </div>
    </div>
  );
}

export default Card;