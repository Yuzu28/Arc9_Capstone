
// Listen on a specific host via the HOST environment variable
var host = process.env.HOST || '0.0.0.0';
// Listen on a specific port via the PORT environment variable
var port = process.env.PORT || 8080;

var cors_proxy = require('cors-anywhere');
cors_proxy.createServer({
    originWhitelist: [], // Allow all origins
    requireHeader: ['origin', 'x-requested-with'],
    removeHeaders: ['cookie', 'cookie2']
}).listen(port, host, function() {
    console.log('Running CORS Anywhere on ' + host + ':' + port);
});


// const express = require('express');
// const app = express();
// app.get('/', (req, res) => {
//     res.send('Welcome to CORS server 😁')
// })
// app.get('/cors', (req, res) => {
//     res.send('This has CORS enabled 🎈')
// })
// app.listen(8080, () => {
//     console.log('listening on port 8080')
// })



// const express = require("express");
// const cors = require("cors");


// const app = express();

// app.use(express.json());
// app.use(
//   cors({
//     origin: "*",
//     allowMethods: "*",
//     allowedHeaders: "*",
//     credentials: false,
//   })
// );

// app.listen(8080, () => {
//     console.log('listening on port 8080')
// })








// app.listen(PORT, () =>{
//     console.log("the port is listiening on port 8080")

// })


