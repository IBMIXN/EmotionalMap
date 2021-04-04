import React from "react";
import "../settings.css";
import ColourPicker from "./ColourPicker"
function SettingsRow(props){
    return(
        <div className="settings-row">
            <div className="emotion-title">
            <h2>{props.emotion}</h2>
            </div>
            <div className="colour-picker">
            <ColourPicker emotion={props.emotion} color={props.colour}/>
            </div>
        </div>
    )
}

export default SettingsRow