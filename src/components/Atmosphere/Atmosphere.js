import React from 'react';

import { returnImage } from '../../utility/getImages';

const Atomsphere = props => (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginLeft: '2rem', margin: '2rem' }}>
      <h1>{props.location.hourly[0].temp}<span>&#176;</span>C</h1>
      <img src={returnImage(props.location.hourly[0].weather.main)} width="100px" height="100px" alt={props.type}/>
    </div>
)

export default Atomsphere;