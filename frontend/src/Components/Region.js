import React, {useState,useEffect,memo} from "react";
import "../index.css";
import { Geography } from "react-simple-maps";
function Region(props) {
    const [strokeColour, setStrokeColour] = useState('black')
    const [strokeWidth, setStrokeWidth] = useState('3px')
    let {setCurrentRegion, colour,geo, geo : {properties : {name}, rsmKey}} = props
    useEffect(() => {
        if (props.clicked === rsmKey){
            setStrokeWidth('6px')

        }else{
            setStrokeWidth('3px')
        }
    }, [props.clicked, rsmKey]);
    function handleClick(){
        props.setClicked(rsmKey)
        setCurrentRegion(name)  
    }
    function handleHover(){
        setStrokeColour('#00AEEF')
        props.setTooltipContent(name)
    }
    function handleNoHover(){
        setStrokeColour('black')
        props.setTooltipContent('')
    }
   
    return (
        <>
        
            
        <Geography  onMouseEnter={() => handleHover()} onMouseLeave = {() => handleNoHover()} onClick={() => handleClick()} fill={colour} strokeWidth={strokeWidth} stroke={strokeColour} key={rsmKey} geography={geo} />

            
      

       
        
        </>
    )
    
};
  
export default memo(Region);
  