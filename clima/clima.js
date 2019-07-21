const axios = require('axios');

const getClima = async(lat, lon) => {
    const respuesta = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=d91adf3b48e83a6eed427e793297cd4d&units=metric`);

    return respuesta.data.main.temp;
}

module.exports = {
    getClima
}