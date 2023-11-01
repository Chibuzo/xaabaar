const express = require('express');
const app = express();
require('dotenv').config();
const path = require('path');

// serve up production assets
app.use(express.static(path.join(__dirname, 'build')));
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});
// if not in production use the port 5000
const PORT = process.env.PORT || 80;
app.set('port', PORT);

app.listen(app.get('port'), () => {
    console.log('App listening on port ' + PORT);
});