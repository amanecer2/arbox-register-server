import * as express from 'express';
import {IUserMap} from "../interface/login.interface";
import {ArboxSchedule, ArboxScheduleService, fakeScheduleItem, IUser, User} from "../utils/arbox-schedule";
import {format} from "date-fns";
import {IScheduleItem} from "../interface/schedule";

const arboxRouter = express.Router();
const _arboxSchedule = new ArboxSchedule();
const _arboxUserSchedule = new ArboxScheduleService();



const router = (arboxUserSchedule: ArboxScheduleService) => {
    const mustHaveToken = function (request, response, next) {
        const token = request.headers.accesstoken;
        if (!token) {
            response.status(401).send(new Error('\'must have token'));
            return
        }

        const user: IUser = arboxUserSchedule.getUser(request.headers.accesstoken) as IUser;

        if (!user) {
            response.status(401).send(new Error('must have register'));
            return
        }

        request.body.authUser = user;
        next();
    };

    arboxRouter.post('/register-user', (req, res) => {
        const {user} = req.body as any;
        const {accesstoken: token} = req.headers as any;

        arboxUserSchedule.setUser(new User(user.userFk, user.membrshipUserFk, token));
        res.json(true);
    });

    arboxRouter.post('/schedule', mustHaveToken, (req, res) => {
        const {schedule, authUser} = req.body;


        arboxUserSchedule.setUserSchedule(authUser, schedule)

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
        const {authUser} = req.body;


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
        const {scheduleID} = req.params;
        const {authUser} = req.body;

        arboxUserSchedule.removeUserSchedule((<any>authUser).userFk, +scheduleID);
        res.json([]);

    });

    arboxRouter.get('/', (req, res) => {
        res.json({helo: 1});
        arboxUserSchedule;
    });
    return arboxRouter;
};
export default router;