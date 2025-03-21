import React from 'react'

const ControlButton = ({toggleLight}) => {
  return (
    <div>
        <p>
        ControlButton
        </p>
        <button onClick={toggleLight} style={{color:'red', background: "grey",fontSize: '20px'}}>butt</button>
    </div>

  )
}

export default ControlButton