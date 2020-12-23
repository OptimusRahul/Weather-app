import React, { useEffect, useState } from 'react';

import { returnImage } from '../../utility/getImages';
import './cityData.css';

const days = [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ]

const CityData = props => {
    // const [dayIndex, setDayIndex] = useState(0);

    const { setDate, location, dayIndex, setDayIndex } = props;
    const { daily } = location;
    
    useEffect(() => {
        if(dayIndex !== undefined) {
            setDate(daily[dayIndex].dt);
        }
    }, [dayIndex, daily, setDate]);

    const setClass = i => setDayIndex(i);

    let selectedcssClass = "city_container-data";

    return (
        <div className="city_container">
            {daily.map((item, index) => {
                if(dayIndex !== undefined && index === dayIndex){
                    selectedcssClass="city_container-data selected"
                } else {
                    selectedcssClass = "city_container-data"
                }
                return (
                    <div key={index} className={selectedcssClass} onClick={() => setClass(index)}>
                        <div className="city_container-day">
                            <h3>{days[new Date(item.dt * 1000).getDay()]}</h3>
                        </div>
                        <div className="city_container-temp">
                            <h3>{parseInt(item.temp.max)}<span>&#176;</span></h3>{' '} <h5>{parseInt(item.temp.min)}<span>&#176;</span></h5>
                        </div>
                        <div className="city_container-img">
                            <img src={returnImage(item.weather[0].main)} width="60px" height="60px" alt={item.weather[0].main}/>
                            <h3>{item.weather[0].main}</h3>
                        </div>
                    </div>
                )
            })}
        </div>
    )
};

export default CityData;