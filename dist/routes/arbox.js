"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const arbox_schedule_1 = require("../utils/arbox-schedule");
const arboxRouter = express.Router();
const _arboxSchedule = new arbox_schedule_1.ArboxSchedule();
const _arboxUserSchedule = new arbox_schedule_1.ArboxScheduleService();
const router = (arboxUserSchedule) => {
    const mustHaveToken = function (request, response, next) {
        const token = request.headers.accesstoken;
        if (!token) {
            response.status(401).send(new Error('\'must have token'));
            return;
        }
        const user = arboxUserSchedule.getUser(request.headers.accesstoken);
        if (!user) {
            response.status(401).send(new Error('must have register'));
            return;
        }
        request.body.authUser = user;
        next();
    };
    arboxRouter.post('/register-user', (req, res) => {
        const { user } = req.body;
        const { accesstoken: token } = req.headers;
        arboxUserSchedule.setUser(new arbox_schedule_1.User(user.userFk, user.membrshipUserFk, token));
        res.json(true);
    });
    arboxRouter.post('/schedule', mustHaveToken, (req, res) => {
        const { schedule, authUser } = req.body;
        arboxUserSchedule.setUserSchedule(authUser, schedule);
        /**
        const fake: IScheduleItem | any = fakeScheduleItem;
        fake.schedule.date = format(new Date(), 'yyyy-MM-dd');
        fake.schedule.time = format(new Date(), 'HH:mm:ss');
        fake.schedule.enableRegistrationTime = 0;
        arboxSchedule.startSchedule(fake);
         setTimeout(() => {arboxSchedule.removeSchedule(fake)}, 40000);

         **/
        res.json([]);
    });
    arboxRouter.get('/schedule', mustHaveToken, (req, res) => {
        const { authUser } = req.body;
        const data = arboxUserSchedule.getUserSchedule(authUser.userFk) || [];
        res.json(data);
    });
    arboxRouter.delete('/schedule/:scheduleID', mustHaveToken, (req, res) => {
        /**
        const fake: IScheduleItem | any = fakeScheduleItem;
        fake.schedule.date = format(new Date(), 'yyyy-MM-dd');
        fake.schedule.time = format(new Date(), 'HH:mm:ss');
        fake.schedule.enableRegistrationTime = 0;
        arboxSchedule.startSchedule(fake);
         setTimeout(() => {arboxSchedule.removeSchedule(fake)}, 40000);

         **/
        const { scheduleID } = req.params;
        const { authUser } = req.body;
        arboxUserSchedule.removeUserSchedule(authUser.userFk, +scheduleID);
        res.json([]);
    });
    arboxRouter.get('/', (req, res) => {
        res.json({ helo: 1 });
        arboxUserSchedule;
    });
    return arboxRouter;
};
exports.default = router;
//# sourceMappingURL=arbox.js.map