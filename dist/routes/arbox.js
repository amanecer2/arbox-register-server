"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const arbox_schedule_1 = require("../utils/arbox-schedule");
const arboxRouter = express.Router();
const _arboxSchedule = new arbox_schedule_1.ArboxSchedule();
const _arboxUserSchedule = new arbox_schedule_1.ArboxScheduleService();
const router = (arboxUserSchedule) => {
    arboxRouter.post('/register-user', (req, res) => {
        const { user } = req.body;
        const { accesstoken: token } = req.headers;
        arboxUserSchedule.setUser(new arbox_schedule_1.User(user.userFk, user.membrshipUserFk, token));
        res.json(true);
    });
    arboxRouter.post('/schedule', (req, res) => {
        const { schedule } = req.body;
        arboxUserSchedule.setUserSchedule(arboxUserSchedule.getUser(req.headers.accesstoken), schedule);
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
    arboxRouter.delete('/schedule/:scheduleID', (req, res) => {
        /**
        const fake: IScheduleItem | any = fakeScheduleItem;
        fake.schedule.date = format(new Date(), 'yyyy-MM-dd');
        fake.schedule.time = format(new Date(), 'HH:mm:ss');
        fake.schedule.enableRegistrationTime = 0;
        arboxSchedule.startSchedule(fake);
         setTimeout(() => {arboxSchedule.removeSchedule(fake)}, 40000);

         **/
        const { scheduleID } = req.params;
        arboxUserSchedule.removeUserSchedule(arboxUserSchedule.getUser(req.headers.accesstoken).userFk, +scheduleID);
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