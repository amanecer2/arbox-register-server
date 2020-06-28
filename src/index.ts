var express = require('express'),
    bodyParser = require('body-parser'),
    fs = require('fs'),
    app = express(),
    inContainer = process.env.CONTAINER,
    inAzure = process.env.WEBSITE_RESOURCE_GROUP,
    notDevelop = process.argv.slice(2)[0],
    port = process.env.PORT || 3000;

var cors = require('cors');
import {ArboxScheduleService, IUser} from "./utils/arbox-schedule";
import arboxRouter from './routes/arbox';

// @ts-ignore
fs.readFile(`data/data.json`, "utf8", function (err, data) {
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
    app.use(cors());
    app.options('*', cors());
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    app.use('/arbox', arboxRouter(arboxUserSchedule));

    app.get('/is-user-login', (req, res) => {
        const user: IUser = arboxUserSchedule.getUser(req.headers.accesstoken) as IUser;
        if (user) {
            return res.json(true)
        }
        return res.status(400).send(new Error('must re register'));
    });

    app.get('/', (req, res) => {
        res.send('hello')
    })
    app.listen(port, () => {
        console.log('starting on port', port)
    });

});