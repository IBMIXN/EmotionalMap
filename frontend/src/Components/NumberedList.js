import React from 'react';
import '../dashboard.css';


export default function NumberedList(props) {
    return (
            <div className="rectangle">
            <div className="circle">
              <div className="white_text">
                {props.number}
              </div>
            </div>
            <div className="black_text">{props.message}</div>
          </div>
    )
}

