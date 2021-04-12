import React, {useState, useContext} from "react";
import "../index.css";
export const ColourContext = React.createContext()
const ColourUpdateContext = React.createContext()

//Colour Hook to acees value
export function useColour(){
    return useContext(ColourContext)
}
//Colour Hook to change value
export function useColourUpdate(){
    return useContext(ColourUpdateContext)
}
//Provides colour down the node tree
function ColourProvider({children}){
    //Colour state
    const [colours, setColours] = useState({
        "Apprehensive": "#C81B25",
        "Confident": "#3DC81B",
        "Impassioned": '#B033AB',
        "Joy": "#F39800",
        "Concerned": "#00AEEF",
      })
    //Fuction to change state
    const changeColour = (emotion, colourCode) => {
       let newColours = colours
       newColours[emotion] = colourCode
       setColours(newColours)
    }
    return(
        <ColourContext.Provider value={colours}>
            <ColourUpdateContext.Provider value={changeColour}>
            {children}
            </ColourUpdateContext.Provider>
        </ColourContext.Provider>
    )
}
export default ColourProvider