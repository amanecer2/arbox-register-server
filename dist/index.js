"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = require("node-fetch");
var express = require('express'), bodyParser = require('body-parser'), fs = require('fs'), app = express(), inContainer = process.env.CONTAINER, inAzure = process.env.WEBSITE_RESOURCE_GROUP, notDevelop = process.argv.slice(2)[0], port = process.env.PORT || 3000;
var cors = require('cors');
const arbox_schedule_1 = require("./utils/arbox-schedule");
const arbox_1 = require("./routes/arbox");
// @ts-ignore
fs.readFile(`data/data.json`, "utf8", function (err, data) {
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
    app.get('/is-user-login', (req, res) => {
        const user = arboxUserSchedule.getUser(req.headers.accesstoken);
        if (user) {
            return res.json(true);
        }
        return res.status(400).send(new Error('must re register'));
    });
    app.get('/', (req, res) => {
        res.send('hello');
    });
    app.listen(port, () => {
        console.log('starting on port', port);
    });
    let reqTimer = setTimeout(function wakeUp() {
        if (Object.keys(arboxUserSchedule.schedule).length === 0) {
            console.log('no future schedule');
            return;
        }
        console.log('there is shome future schedule ', Object.keys(arboxUserSchedule.schedule).length);
        node_fetch_1.default("https://arbox-register.herokuapp.com").then(res => {
            console.log("WAKE UP DYNO");
            return reqTimer = setTimeout(wakeUp, 1200000);
        });
    }, 600000); //1200000);
});
process.on('beforeExit', code => {
    // Can make asynchronous calls
    setTimeout(() => {
        console.log(`Process will exit with code: ${code}`);
        process.exit(code);
    }, 100);
});
process.on('exit', code => {
    // Only synchronous calls
    console.log(`Process exited with code: ${code}`);
});
process.on('SIGTERM', signal => {
    console.log(`Process ${process.pid} received a SIGTERM signal`);
    process.exit(0);
});
process.on('SIGINT', signal => {
    console.log(`Process ${process.pid} has been interrupted`);
    process.exit(0);
});
//# sourceMappingURL=index.js.map