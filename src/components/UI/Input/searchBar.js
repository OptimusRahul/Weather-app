import React, { useEffect, useState } from 'react';
import PlacesAutocomplete, { geocodeByAddress } from "react-places-autocomplete";

import { makeStyles } from '@material-ui/core/styles';
import { Paper, InputBase, IconButton, CircularProgress } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import SearchIcon from '@material-ui/icons/Search';

import { getCityCoords } from '../../../api/index';
import { returnImage } from '../../../utility/getImages';

import './searchBar.css';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '45rem',
    marginTop: '1rem'
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

  const [loading, setLoading] = useState(false);
  const [cityName, setCityName] = useState(city);
  const [address, setAddress] = useState("");
  const [cities, setCities] = useState([]);
  const [suggestions, setSuggestion] = useState([]);

  const classes = useStyles();

  useEffect(() => {
    setCityName(city);
  }, [city])

  const handleSelect = async(address) => {
    const results = await geocodeByAddress(address);
    try{
      const { long_name: city } = results?.[0]?.address_components?.[0] ?? { long_name: '' };
      const data = await getCityCoords(city);
      const { lat, lon } = data.city.coord;
      props.getLocationWeatherReport({ lat, lon });
      setCities([]);
      setAddress(address);
    } catch(err) {
      alert('Cannot find weather for the selected city')
    }
  };

  const renderCities = (getSuggestionItemProps) => {
    return cities.map(({ suggestion, name, country, weather, temp }, index) => {
        return (
          <div key={index}>
            <Paper
              component="form"
              className={classes.root1}
              style={{ cursor: 'pointer' }}
              {...getSuggestionItemProps(suggestion)}>
              <div>{name}, {country}</div>
              <div className={classes.temp}>
                <div>
                  <h3 style={{ height: '10px' }}>{Math.ceil(temp)}<span>&#176;</span>C</h3>
                  <h3>{weather}</h3>
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
      console.log(data, suggestion)
      if(data && !data.error){
        let obj = { suggestion, name: cityName, country: countryName, temp: data.city.main.temp, weather: data.city.weather[0].main}
        currentCities.push(obj);
      }
    }
    setLoading(false);
    setCities(currentCities);
  }, [suggestions])

  const handleCities = (e, suggestions) => {
    if(e.target.value){
      setLoading(true);
      setCityName(e.target.value);
      setSuggestion(suggestions);
    }
  }

  const handleError = () => {
    setLoading(false);
    setCities([]);
    alert('Please provide valid city')
  }

  return (
    <PlacesAutocomplete onError={handleError} value={address} onChange={setAddress} onSelect={handleSelect}>
        {({ getInputProps, suggestions, getSuggestionItemProps }) => (
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

            <div  style={{ position: 'absolute' }}>
              {loading ? <div style={{ margin: 'auto' }}><CircularProgress /></div> : null}
              {renderCities(getSuggestionItemProps)}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
}

export default CustomizedInputBase;