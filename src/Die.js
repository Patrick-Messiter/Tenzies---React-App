import React from 'react'

function Die (props) {
    
    const styles = {
        backgroundColor: props.isHeld ? "green" : "white"
    }
    
    return(
        <div onClick={props.holdDice} style={styles} className='Die' >
            <h1>{props.value}</h1>
        </div>
    )
}

export {Die}