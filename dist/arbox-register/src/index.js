"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express'), bodyParser = require('body-parser'), fs = require('fs'), app = express(), inContainer = process.env.CONTAINER, inAzure = process.env.WEBSITE_RESOURCE_GROUP, notDevelop = process.argv.slice(2)[0], port = process.env.PORT || 3000;
const users = new Map();
const arbox_1 = require("./routes/arbox");
function loggerMiddleware(request, response, next) {
    console.log(`${request.method} ${request.path}`);
    next();
}
app.use(loggerMiddleware);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, Authorization, X-Requested-With, X-XSRF-TOKEN, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    next();
});
app.use('/arbox', arbox_1.default(users));
app.listen(port, () => {
    console.log('starting on port', port);
});
//# sourceMappingURL=index.js.map