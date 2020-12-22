export const getLocationObject = (lat, lon) => ({lat, lon});

export const covertFahrenheitToCelsius = (temp) => ((temp - 32) * (5/9));