import React, { useEffect, useState } from 'react';
import PlacesAutocomplete, { geocodeByAddress } from "react-places-autocomplete";

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import SearchIcon from '@material-ui/icons/Search';

import { getCityCoords } from '../../../api/index';
import { returnImage } from '../../../utility/getImages';

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

  const { city } = props.location;

  const [cityName, setCityName] = useState(city);
  const [address, setAddress] = useState("");
  const [cities, setCities] = useState([]);
  const [suggestions, setSuggestion] = useState([]);

  const classes = useStyles();

  useEffect(() => {
    setCityName(city);
  }, [city])

  const handleSelect = async(value) => {
    const results = await geocodeByAddress(value);
    try{
      const city = results[0].address_components[0].long_name;
      const data = await getCityCoords(city);
      const { lat, lon } = data.city.coord;
      props.getLocationWeatherReport({ lat, lon });
      setCities([]);
      setAddress(value);
    } catch(err) {
      alert('Cannot find weather for the selected city')
    }
  };

  const renderCities = (getSuggestionItemProps) => {
    return cities.map((city, index) => {
        return (
          <div key={index}>
            <Paper
              component="form"
              className={classes.root1}
              style={{ zIndex: 100 }}
              {...getSuggestionItemProps(city.suggestion)}>
              <div>{city.name}, {city.country}</div>
              <div className={classes.temp}>
                <div>
                  <h3 style={{ height: '10px' }}>{city.temp}<span>&#176;</span>C</h3>
                  <h3>{city.weather}</h3>
                </div>
                <div>
                  <img src={returnImage(city.weather)} width="40px" height="40px" alt={props.type} />
                </div>
              </div>
            </Paper>
          </div>
        )
    })
  }

  // eslint-disable-next-line
  useEffect(async() => {
    const currentCities = [];
    for(const suggestion of suggestions) {
      const cityName = suggestion.formattedSuggestion.mainText;
      const countryName = suggestion.formattedSuggestion.secondaryText;
      let data = await getCityCoords(cityName);
      if(data !== undefined && data !== null && !data.error){
        let obj = { suggestion, name: cityName, country: countryName, temp: data.city.main.temp, weather: data.city.weather[0].main}
        currentCities.push(obj);
      }
    }
    setCities(currentCities);
  }, [suggestions])

  const handleCities = (e, suggestions) => {
    setCityName(e.target.value);
    setSuggestion(suggestions);
  }

  return (
    <PlacesAutocomplete value={address} onChange={setAddress} onSelect={handleSelect}>
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <Paper component="form" className={classes.root}>
              <IconButton className={classes.iconButton} aria-label="menu">
                <LocationOnIcon />
              </IconButton>

              <InputBase
                className={classes.input}
                // eslint-disable-next-line
                inputProps={{ 'aria-label': 'search google maps' }, { ...getInputProps({ placeholder: cityName }) }}
                value={cityName}
                fullWidth={true}
                onChange={(e) => handleCities(e, suggestions)}
                />
              <IconButton type="submit" className={classes.iconButton} aria-label="search">
                <SearchIcon />
              </IconButton>
            </Paper>

            <div>
              {loading ? <div>...loading</div> : null}
              {renderCities(getSuggestionItemProps)}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
}

export default CustomizedInputBase;