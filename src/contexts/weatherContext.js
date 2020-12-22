import React, { createContext } from 'react';

const weatherContext = createContext({ 
    location: ''
});

export default weatherContext;