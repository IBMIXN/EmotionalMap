import React, {useState, useEffect, memo} from "react";
import "../index.css";
import { ComposableMap, Geographies} from "react-simple-maps";
import datum from '../regions.json'
import Region from './Region'
import {useColour} from './ColourContext'

function Map(props) {
  const [colours,setColours] = useState({})
  const [clicked,setClicked] = useState('')
  const mapData = props.mapData
  const colourCode = useColour()
  useEffect(() => {
    //figures out what region needs what colour
    function calcColour(regionData) {
      let max = 0
      let colour = 'gray'
      for (let key in colourCode){
        if (regionData[key.toLowerCase()] > max){
          colour = colourCode[key]
          max = regionData[key.toLowerCase()]
        }
      }
      return colour
    }
    mapData.forEach((regionData) => {
      setColours(colours => ({
     ...colours,
       [regionData.name] : calcColour(regionData)}))
    })
    
  },[mapData, colourCode])
  return (
    <ComposableMap data-tip="" style={{width: "100%", height: "90vh"}}  projectionConfig = {{center:[-3, 55.4],rotation:[4.4,0,0],parallels:[50,60],scale: 6000}}>
    <Geographies geography={datum}>
      {
       ({ geographies }) => 
        geographies
        .map((geo,index) => {
            return(
              <>
              <Region setTooltipContent={props.setTooltipContent}  setClicked = {setClicked} clicked = {clicked} setCurrentRegion = {props.setCurrentRegion} geo = {geo} colour = {colours[geo.properties.name]}></Region>
              </>
                )
          }
      )
      }
    </Geographies>
  </ComposableMap>      
  );
}
//avoid rerenders when props havent changed
export default memo(Map);
