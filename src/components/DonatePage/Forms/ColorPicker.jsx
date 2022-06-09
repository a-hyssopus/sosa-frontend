import React, {useState} from "react";
import reactCSS from 'reactcss'

import {SketchPicker} from 'react-color';

const ColorPicker = ({
                         color = {
                             r: '241',
                             g: '112',
                             b: '19',
                             a: '1',
                         },
                         setColor
                     }) => {

    const [displayColorPicker, setDisplayColorPicker] = useState(false);

    const handleClick = () => {
        setDisplayColorPicker(prevValue => !prevValue)
    };

    const handleClose = () => {
        setDisplayColorPicker(false)
    };

    const handleChange = (color) => {
        setColor(color.rgb);
    };

    const styles = reactCSS({
        'default': {
            container: {
                display: 'table',
                width: '100%',
                margin: '10px'
            },
            color: {
                width: '100%',
                height: '14px',
                borderRadius: '2px',
                background: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
            },
            swatch: {
                display: 'table-cell',
                width: '100%',
                padding: '5px',
                background: '#fff',
                borderRadius: '1px',
                boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
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

    return (
        <div style={styles.container}>
            <div style={styles.swatch} onClick={handleClick}>
                <div style={styles.color}/>
            </div>
            {displayColorPicker ? <div style={styles.popover}>
                <div style={styles.cover} onClick={handleClose}/>
                <SketchPicker color={color} presetColors={[]} onChange={handleChange}/>
            </div> : null}

        </div>
    )
};

export default ColorPicker
