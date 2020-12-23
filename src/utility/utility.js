export const getLocationObject = (lat, lon) => ({lat, lon});

export const covertFahrenheitToCelsius = (temp) => Math.ceil((temp - 32) * (5/9));

export const convertTime = (time) => {
    if(time === 12) return '12PM'
    else if(time > 12) return `${time - 12}PM`;
    else return`${time}AM`
}