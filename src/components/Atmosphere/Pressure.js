import React from 'react';

const style = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center', 
    background: '#add8e6',
    margin: '2rem 0',
    width: '10rem',
    height: '5rem',
    borderRadius: '5px',
    marginLeft: '2px'
}

const PressureHumidity = props => {
    return(
        <>
            <div style={style}>
                <h1 style={{ height: '10px' }}>Pressure</h1>
                <h5>{props.location.hourly[0].pressure} hpa</h5>
            </div>
            <div style={style}>
                <h1 style={{ height: '10px' }}>Humidity</h1>
                <h5>{props.location.hourly[0].humidity}%</h5>
            </div>
        </>
    )
}

export default PressureHumidity;