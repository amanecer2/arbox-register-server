"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const app = express();
let listenPort = process.env.PORT || 3000;
app.get('/', (req, res) => {
    res.json({ 'helo': 'workl' });
});
app.listen(listenPort, () => {
    console.log("server running on port " + listenPort);
});
/*
import {rescheduleJob} from "node-schedule";

var express = require('express'),
    bodyParser = require('body-parser'),
    fs = require('fs'),
    app = express(),
    inContainer = process.env.CONTAINER,
    inAzure = process.env.WEBSITE_RESOURCE_GROUP,
    notDevelop = process.argv.slice(2)[0],
    port = process.env.PORT || 3000;

var cors = require('cors');
import {ArboxScheduleService} from "./utils/arbox-schedule";
import arboxRouter from './routes/arbox';

console.log('before');
// @ts-ignore
fs.readFile("src/data/data.json", "utf8", function (err, data) {
    console.log('before');

    if (err) throw err;


    const arboxUserSchedule = new ArboxScheduleService();
    arboxUserSchedule.restoreData(data);

    function loggerMiddleware(request, response, next) {
        //console.log(`${request.method} ${request.path}`);
        console.log();
        next();
    }

    app.use(loggerMiddleware);
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    var allowedOrigins = ['http://localhost:3000', 'http://localhost:8080', 'http://localhost:8100', 'http://localhost',
        'http://localhost:8100/'];

    app.use(cors({
        origin: function (origin, callback) {
            // allow requests with no origin
            // (like mobile apps or curl requests)
            if (!origin) return callback(null, true);
            if (allowedOrigins.indexOf(origin) === -1) {
                var msg = 'The CORS policy for this site does not ' +
                    'allow access from the specified Origin.';
                return callback(new Error(msg), false);
            }
            return callback(null, true);
        }
    }));

    app.use('/arbox', arboxRouter(arboxUserSchedule));

    app.listen(port, () => {
        console.log('starting on port', port)
    });

});*/
//# sourceMappingURL=index.js.map