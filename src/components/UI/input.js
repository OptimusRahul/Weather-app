import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import SearchIcon from '@material-ui/icons/Search';

import { getCityCoords } from '../../api/index';
import { returnImage } from '../../utility/getImages';

import './input.css';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '45rem',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  root1: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '45rem',
    justifyContent: 'space-between',
    height: '50px'
  },
  temp: {
    display: 'flex',
    justifyContent: 'row',
    alignItems: 'center'
  }
}));


const CustomizedInputBase = (props) => {
  const [city, setCity] = useState();
  const [list, setList] = useState();
  const classes = useStyles();

  useEffect(() => {
    if(city !== undefined && city !== null) {
      async function getCoords() {
        if(city !== ''){
          const data = await getCityCoords(city);
          // if(!data.error) {
            setList(data);
          // }
        }
      }
      getCoords();
    }
  }, [city])

  const renderCities = (e) => setCity(e.target.value);

  const getCityData = () => {
    const { lat, lon }= list.city.coord;
    props.getLocationWeatherReport({ lat, lon });
    setList(undefined);
  }

  return (
    <>
      <Paper component="form" className={classes.root}>
        <IconButton className={classes.iconButton} aria-label="menu">
          <LocationOnIcon />
        </IconButton>
        <InputBase
          className={classes.input}
          placeholder={props.location ? props.location.city : 'Placeholder'}
          inputProps={{ 'aria-label': 'search google maps' }}
          fullWidth={true}
          onChange={(e) => renderCities(e)}
        />
        <IconButton type="submit" className={classes.iconButton} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
      {(list !== null && list !== undefined && !list?.error) ? 
        (<Paper component="form" className={classes.root1} style={{ zIndex: 100 }} onClick={getCityData}>
            <div>{list?.city?.name}</div>
            <div className={classes.temp}>
              <div>
                  <h3 style={{ height: '10px' }}>{list?.city?.main?.temp}<span>&#176;</span>C</h3>
                  <h3>{list?.city?.weather[0]?.main}</h3>
              </div>
              <div>
                <img src={returnImage(list?.city?.weather[0]?.main)} width="40px" height="40px" alt={props.type}/>
              </div>
            </div>
        </Paper>)
        : null
      }
    </>
  );
}

export default CustomizedInputBase;