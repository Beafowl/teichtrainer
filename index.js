const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname)));

const PORT = 80 || process.env.PORT;

app.get('/trainer', (req, res) => {

    res.sendFile(path.join(__dirname, 'webpage/index.html'));

});

app.get('/', (req, res) => {

    res.send('beafowl.de');
    res.end();
})

app.listen(PORT, () => { console.log(`Started server on port ${PORT}`)});