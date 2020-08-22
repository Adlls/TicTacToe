import express from 'express';
let app = express();
let server = require('http').Server(app);

app.use(express.static(__dirname + '/'));

app.get('/', (req, res) => {
    res.sendFile( '/index.html');
});

server.listen(8580, function () {
    console.log(`listen ${server.address().port}`);
});
