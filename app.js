const lugar = require('./lugar/lugar');
const clima = require('./clima/clima');

const argv = require('yargs').options({
    direccion: {
        alias: 'd',
        desc: 'Dirección de la ciudad para obtener clima',
        demand: true
    }
}).argv;

/*lugar.getLugarLatLon(argv.direccion)
    .then(console.log);

clima.getClima(-33.459999, -70.639999)
    .then(console.log)
    .catch(console.log);
*/
const getInfo = (direccion) => {
    lugar.getLugarLatLon(direccion)
        .then(respuesta => {
            clima.getClima(respuesta.lat, respuesta.lon)
                .then(temperatura => {
                    console.log(`El clima de ${respuesta.direccion} es de ${temperatura}`);
                })
                .catch(`No se pudo determinar el clima de ${respuesta.direccion}`);
        })
        .catch(console.log);
};

const getInfoAsync = async(direccion) => {
    try {
        const coordenadas = await lugar.getLugarLatLon(direccion);
        const temperatura = await clima.getClima(coordenadas.lat, coordenadas.lon);
        return `El clima de ${coordenadas.direccion} es de ${temperatura}`;
    } catch (e) {
        return `No se pudo determinar el clima de ${coordenadas.direccion}`;
    }
}

getInfo(argv.direccion);

getInfoAsync(argv.direccion).then(console.log).catch(console.log);