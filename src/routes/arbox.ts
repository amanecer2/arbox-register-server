import * as express from 'express';
import {IUserMap} from "../interface/login.interface";
import {ArboxSchedule, ArboxScheduleService, fakeScheduleItem, User} from "../utils/arbox-schedule";
import {format} from "date-fns";
import {IScheduleItem} from "../interface/schedule";

const arboxRouter = express.Router();
const _arboxSchedule = new ArboxSchedule();
const _arboxUserSchedule = new ArboxScheduleService();

const router = (arboxUserSchedule: ArboxScheduleService) => {
    arboxRouter.post('/register-user', (req, res) => {
        const {user} = req.body as any;
        const {accesstoken: token} = req.headers as any;

        arboxUserSchedule.setUser(new User(user.userFk, user.membrshipUserFk, token));
        res.json(true);
    });

    arboxRouter.post('/schedule', (req, res) => {
        const {schedule} = req.body;

        arboxUserSchedule.setUserSchedule(arboxUserSchedule.getUser(req.headers.accesstoken), schedule)

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
        const {scheduleID} = req.params;

        arboxUserSchedule.removeUserSchedule(arboxUserSchedule.getUser(req.headers.accesstoken).userFk, +scheduleID);
        res.json([]);

    });

    arboxRouter.get('/', (req, res) => {
        res.json({helo: 1});
        arboxUserSchedule;
    });
    return arboxRouter;
};
export default router;