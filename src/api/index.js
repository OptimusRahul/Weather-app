import axios from 'axios';
import { IP_DNS_LOOK_UP, OPEN_WEATHER_API_CONFIGURATION } from '../config/config';

const { DNS_LOOK_UP_ADDRESS, IP_LOOK_UP_ADDRESS } = IP_DNS_LOOK_UP;
const { OPEN_WEATHER_API_KEY, OPEN_WEATHER_API_URL  } = OPEN_WEATHER_API_CONFIGURATION;

const dnsLookUp = async() => {
    return await axios.get(DNS_LOOK_UP_ADDRESS).then(({ data }) => {
        const { dns, edns } = data;
        return { dns, edns };
    })
}

export const ipLookUp = async() => {
    const { dns, edns } = await dnsLookUp();

    let dnsData = null, ednsData = null;

    dns && dns.ip && await axios.get(`${IP_LOOK_UP_ADDRESS}/${dns.ip}`).then(({ data }) => {
        dnsData = data;
    });

    edns && edns.ip && await axios.get(`${IP_LOOK_UP_ADDRESS}/${edns.ip}`).then(({ data }) => {
        ednsData = data;
    });

    return { dnsData, ednsData };
}

export const getCityCoords = async(cityName) => {
    let obj = {}
    await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${OPEN_WEATHER_API_KEY}`).then((res) => {
        obj = { city: res.data, error: false } 
    }).catch(err => {
        obj = { error: true }
    });
    return obj;
}

export const getWeatherReport = async({lat, lon}) => {
    let obj = { };
    await axios.get(`${OPEN_WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${OPEN_WEATHER_API_KEY}`).then((res) => {
        obj = { city: res.data.name };
    });
    
    await axios.get(`${OPEN_WEATHER_API_URL}/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${OPEN_WEATHER_API_KEY}`).then((res) => {
        obj = {...obj, ...res.data}
    });
    return obj
}