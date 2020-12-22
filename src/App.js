import { useCallback, useEffect, useState } from 'react';

import CityData from './components/DailyCityData/cityData';
import Heading from './components/Atmosphere/Atmosphere';
import Line from './components/Chart/lineChart';
import Pressure from './components/Atmosphere/Pressure';
import SunChart from './components/Chart/dayTimeChart';

import { ipLookUp, getWeatherReport } from './api/index';

import Input from './components/UI/input';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper'

import './App.css';

const App = () => {
  const [locationReport, setLocationReport] = useState();
  const [date, setDate] = useState(null);

  const getLocationWeatherReport = async({ lat, lon }) => {
    const data = await getWeatherReport({ lat, lon });
    setLocationReport(data);
  }

  const getIpLookUp = useCallback(() => {
    (async function ip() {
      const { dnsData, ednsData } = await ipLookUp();          
      if(ednsData) {
        getLocationWeatherReport(ednsData);
      }
      else {
        getLocationWeatherReport(dnsData);
      }
    })()
  },[])

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async function success({ coords }) {
          const { latitude, longitude } = coords;
          const locationData = { lat: latitude, lon: longitude };
          getLocationWeatherReport(locationData);
        },

        function error(error) {
          getIpLookUp();
        }
      )
    } else {
      getIpLookUp();
    }
  }, [getIpLookUp]);

  return (
    <div className="App">
      <Input location={locationReport} getLocationWeatherReport={getLocationWeatherReport}/>
      {locationReport !== undefined ? <CityData location={locationReport} setDate={setDate}/> : <CircularProgress /> }
      <Paper elevation={3} style={{ width: '45rem', height: '49rem' }}>
        {
          locationReport !== undefined ?
          (
            <>
              <div> <Heading location={locationReport} /> </div>
              <div className="chartWrapper"> <Line location={locationReport} date={date}/> </div>
              <div style={{ display: "flex", justifyContent: "space-around" }}> <Pressure location={locationReport}/> </div>
              <div className="chartWrapper2"> <SunChart location={locationReport}/> </div>
            </>
          ) : <CircularProgress />
        }
      </Paper>
    </div>
  );
}

export default App;
