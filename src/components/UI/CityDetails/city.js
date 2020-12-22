import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { getCityCoords } from '../../../api/index';
import { returnImage } from '../../../utility/getImages';

const useStyles = makeStyles((theme) => ({
    temp: {
      display: 'flex',
      justifyContent: 'row',
      alignItems: 'center'
    }
  }));

const City = async(props) => {
    const classes = useStyles();

    const { name, states } = props;

    
    const list = await getCityCoords(name);
     

    return (
        <>
            <div>{name}, {states}</div>
            <div className={classes.temp}>
                <div>
                    <h3 style={{ height: '10px' }}>{list?.city?.main?.temp}<span>&#176;</span>C</h3>
                    <h3>Cloud</h3>
                </div>
                <div>
                    <img src={returnImage(list?.city?.weather[0]?.main)} width="40px" height="40px" alt={props.type}/>
                </div>
            </div>
        </>
    );
}

export default City;