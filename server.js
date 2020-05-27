const http = require('http');
const path = require('path');
const express = require('express');

const router = express();
const server = http.createServer(router);

router.use('/client', express.static(path.resolve(__dirname, 'client')));

router.get('/data', (req, res, next) => {
    const time =  (new Date()).getTime();
    let second = Math.random() * 10000;

    if (second < 1000) {
        return res.json({hasValue: false, value: null})
    }

    if (second > 8000) {
        second = 60000;
    }

    console.log("delay in second: ", second);

    return setTimeout(() => {
        return res.json({hasValue: true, value: time});
    }, second)

    return res.json("hello world");
});

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", () => {
    const addr = server.address();
    console.log("Server listening at ", addr.address + ":" + addr.port);
})