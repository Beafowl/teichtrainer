const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'webpage')))

const PORT = 80 || process.env.PORT;

app.get('/', (req, res) => {

    res.sendFile('index.html');

});

app.listen(PORT, () => { console.log(`Started server on port ${PORT}`)});