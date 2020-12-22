import Clear from '../assets/sun.svg';
import Sunny from '../assets/sunny.svg';
import Clouds from '../assets/clouds.svg';
import Rain from '../assets/rain.svg';
import Snow from '../assets/snowfall.svg';

export const returnImage = (type) => {
    switch(type) {
        case 'Clouds': return Clouds;
        case 'Clear': return Clear;
        case 'Snow': return Snow;
        case 'Rain': return Rain;
        default: return Sunny;
    }
}