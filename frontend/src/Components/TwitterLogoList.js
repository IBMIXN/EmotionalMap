import React from 'react';
import '../dashboard.css';
import twitterLogo from '../images/twitterLogo.png';

const checkLong = (long) => {
  if(long)
    return "long_rectangle";
  else
    return "rectangle";
  
}

export default function TwitterLogoList(props) {
    return (
            <div className={checkLong(props.long)}>
            <div className="white-circle">
              <div className="twitterLogo">
                  <img src={twitterLogo} alt="TwitterLogo"/>
              </div>
            </div>
            <div className="black_text">{props.message}</div>
          </div>
    )
}

