"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express'), bodyParser = require('body-parser'), fs = require('fs'), app = express(), inContainer = process.env.CONTAINER, inAzure = process.env.WEBSITE_RESOURCE_GROUP, notDevelop = process.argv.slice(2)[0], port = process.env.PORT || 3000;
var cors = require('cors');
const arbox_schedule_1 = require("./utils/arbox-schedule");
const arbox_1 = require("./routes/arbox");
console.log('before');
// @ts-ignore
fs.readFile("src/data/data.json", "utf8", function (err, data) {
    console.log('before');
    if (err)
        throw err;
    const arboxUserSchedule = new arbox_schedule_1.ArboxScheduleService();
    arboxUserSchedule.restoreData(data);
    function loggerMiddleware(request, response, next) {
        //console.log(`${request.method} ${request.path}`);
        console.log();
        next();
    }
    app.use(loggerMiddleware);
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cors());
    app.options('*', cors());
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
    app.use('/arbox', arbox_1.default(arboxUserSchedule));
    app.get('/', (req, res) => {
        res.send('hello');
    });
    app.listen(port, () => {
        console.log('starting on port', port);
    });
});
//# sourceMappingURL=index.js.map