const config = require('./src/config');
const app = require('./src/app');

const apiIp = config.api.ip;
const apiPort = config.api.port;

app.listen(apiPort, () => {
    console.log('\nMODE:', config.mode);
    console.log(
        'Compareit API listen on', 
        `http://${apiIp}:${apiPort}\n`
    );
});