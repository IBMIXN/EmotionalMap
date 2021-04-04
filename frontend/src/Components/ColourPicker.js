import React, {useState} from 'react'
import reactCSS from 'reactcss'
import { SketchPicker } from 'react-color'
import {useColourUpdate} from './ColourContext'
function ColourPicker(props) {
    const [displayColorPicker, setDisplayColorPicker] = useState(false);
    const [color, setColor] = useState(props.color)
    const colourUpdater = useColourUpdate()
    const styles = reactCSS({
        'default': {
          color: {
            width: '1em',
            height: '1em',
            borderRadius: '50px',
            background: `${color}`,
          },
          swatch: {
            padding: '5px',
            margin: '0 auto',
            background: '#fff',
            borderRadius: '50px',
            boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
            display: 'inline-block',
            cursor: 'pointer',
          },
          popover: {
            position: 'absolute',
            zIndex: '2',
          },
          cover: {
            position: 'fixed',
            top: '0px',
            right: '0px',
            bottom: '0px',
            left: '0px',
          },
        },
      });
    
    //on click display colour picker hide when done and update colour state when colour chosen
    const handleClick = () => {
        setDisplayColorPicker(!displayColorPicker)
      };
    const handleClose = () => {
        setDisplayColorPicker(false)
      };
    const handleChange = (colour) => {
        console.log(colour)
        setColor(colour.hex)
        colourUpdater(props.emotion, colour.hex)
      };
      return (
        <div style={{margin:'0 auto'}}>
          <div style={ styles.swatch } onClick={ () => handleClick() }>
            <div style={ styles.color } />
          </div>
          { displayColorPicker ? <div style={ styles.popover }>
            <div style={ styles.cover } onClick={ () => handleClose() }/>
            <SketchPicker color={ color } onChange={ (color) => handleChange(color) } />
          </div> : null }
  
        </div>
      )
}


export default ColourPicker