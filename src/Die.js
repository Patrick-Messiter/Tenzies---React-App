import React from 'react'

function Die (props) {
    
    const containerStyles = {
        backgroundColor: props.isHeld ? "green" : "white"
    }

    const fontStyles = {
        color: props.isHeld ? "white" : "black"
    }
    
    return(
        <div onClick={props.holdDice} style={containerStyles} className='Die' >
            <h1 style={fontStyles}>{props.value}</h1>
        </div>
    )
}

export {Die}