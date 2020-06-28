import {IScheduleItem} from "../interface/schedule";
import * as schedule from 'node-schedule';
import {Job} from "node-schedule";
import {addHours, isAfter} from "date-fns";
import {API} from "../arbox-api/login";
import {saveData} from "./save-file.utis";
import {arboxAjax} from "./fetch";
import {ARBOX_ERRORS} from "../constant/error.constant";

export class ArboxScheduleService {

    users: IUserObject = {};
    schedule: IUsersSchedule = {};
    arboxSchedule = new ArboxSchedule();

    restoreData(data) {
        const _dat = JSON.parse(data);

        try {
            this._restoreUsers(JSON.parse(_dat.users));
        } catch (e) {
            this._restoreUsers( _dat.users);
        }

        try {
            this._restoreSchsule(JSON.parse(_dat.schedule))
        }catch (e) {
            this._restoreSchsule(_dat.schedule)
        }

    }
    _restoreUsers(data) {
        this.users = data;

    }
    _restoreSchsule(data) {
        Object.keys(data).forEach( userId => {
            data[userId].forEach((s: IScheduleItem) => {
                if (!isAfter(new Date(), new Date(s.schedule.date))) {
                    this.setUserSchedule(this.getUser(userId), s);
                }
            })
        });
    }

    getUser(id) {
        return this.users[id];
    }

    setUser(user: IUser) {
        this.users[user.userFk] = user
        this.users[user.token] = user
        this.save();
    }

    removeUser(user: IUser) {
        if (this.users[user.userFk]) {
            delete this.users[user.userFk];
            delete this.users[user.token];
            this.save();
            return true;
        }
        return false;

    }

    setUserSchedule(_user: IUser, schedule: IScheduleItem) {
        if (!this.schedule[_user.userFk]) {
            this.schedule[_user.userFk] = []
        }
        if (this.schedule[_user.userFk].find((s) => s.schedule.id === schedule.schedule.id)) {
            return false
        }
        const user = this.users[_user.userFk];
        const fetch = arboxAjax(user.token)()(API.scheduleUser(), {
            scheduleFk: schedule.schedule.id,
            userFk: user.userFk,
            membrshipUserFk: user.membrshipUserFk
        });


        this.schedule[_user.userFk].push(schedule);
        this.arboxSchedule.startSchedule(schedule, fetch);
        this.save();


        return true;
    }

    removeUserSchedule(userId, scheduleId: number) {
        if (!this.schedule[userId]) return false;

        const index = this.schedule[userId].findIndex((s) => s.schedule.id === scheduleId);
        if (index > -1) {
            this.arboxSchedule.removeSchedule(this.schedule[userId][index].schedule.id);
            this.schedule[userId] = this.schedule[userId].filter((_, _index) => _index !== index);
            this.save();
            return true
        }

        return false;
    }

    getUserSchedule(userId) {
        return this.schedule[userId];
    }

    save() {
        saveData(this);
    }
}

export class ArboxSchedule {
    private scheduleJob = {} as scheduleJob;

    startSchedule(scheduleItem: IScheduleItem, fetch: () => Promise<any>) {
        const workoutDateWithTime = `${scheduleItem.schedule.date} ${scheduleItem.schedule.time}`;
        let timeBeforeAllow = addHours(new Date(workoutDateWithTime), -scheduleItem.schedule.enableRegistrationTime)

        if (+timeBeforeAllow < +new Date() || scheduleItem.schedule.enableRegistrationTime === 0) {
            timeBeforeAllow = new Date()
        }
        const startTime = new Date(+new Date(timeBeforeAllow) - (3 * 10 * 1000)); // 30 seconds before
        const endTime = new Date(+new Date(timeBeforeAllow) + (2 * 60 * 1000)); // 2 min after

        //console.log('workoutDateWithTime', workoutDateWithTime);
       // console.log('timeBeforeAllow', timeBeforeAllow);
        console.log('workout waiting ', scheduleItem.category, scheduleItem.schedule.date, scheduleItem.schedule.time )

        console.log('startTime', startTime);
        console.log('endTime', endTime);

        this.scheduleJob[scheduleItem.schedule.id] = schedule.scheduleJob({
            start: startTime,
            end: endTime,
            rule: '*/10 * * * * *'
        }, async () => {
            console.log('trying to sign in to ', scheduleItem.category, scheduleItem.schedule.id, new Date().toISOString());
            if (fetch) {
                try {
                    const res = await fetch();

                    if (res.errorCode === ARBOX_ERRORS.REGISTER_NOT_OPEN_YET) {
                        return
                    }
                    this.removeSchedule(scheduleItem.schedule.id);
                    console.log('your in the workout!!', scheduleItem.schedule.id, scheduleItem.category, res)
                } catch (e) {
                    this.removeSchedule(scheduleItem.schedule.id);
                    console.log('shoething went wrong', e)

                }
            }

        });
    }

    removeSchedule(scheduleItemId: number) {
        if (this.scheduleJob[scheduleItemId]) {
            this.scheduleJob[scheduleItemId].cancel();
            return true
        }
        return false;
    }
}

interface scheduleJob {
    [workoutID: string]: Job
}

export interface IUserObject {
    [userId: string]: IUser
}

export class User implements IUser {
    constructor(public userFk: number, public membrshipUserFk: number, public token: string) {
    }
}

export interface IUser {
    userFk: number,
    membrshipUserFk: number;
    token: string;
}

export interface IUsersSchedule {
    [userId: string]: IScheduleItem[]
}

export const fakeScheduleItem = {
    "category": "W.O.D",
    "schedule": {
        "id": 4716014,
        "boxFk": 59,
        "workoutId": 81425,
        "date": "2020-06-25",
        "time": "07:30:00",
        "maxUsers": 16,
        "minUsers": 0,
        "liveLink": null,
        "cancelLimit": null,
        "coachFk": 27721,
        "boxCategoryFk": 876,
        "locationsBoxFk": 48,
        "enableRegistrationTime": 48,
        "disableCancellationTime": 0.29999999999999999,
        "enableLateCancellation": 0,
        "seriesFk": 46308,
        "status": "active",
        "transparent": 0,
        "endTime": "08:30:00",
        "cancelledBy": null
    },
    "numberOfUsers": 1,
    "users": [
        {
            "id": 582466,
            "firstName": "\u05d3\u05e0\u05d9\u05d0\u05dc",
            "lastName": "\u05d0\u05e4\u05e8\u05ea\u05d9",
            "image": null
        }
    ],
    "alreadyMember": false,
    "coach": "\u05e0\u05d9\u05e7\u05d9 \u05e4\u05d8\u05dc",
    "standbyUser": false,
    "membershipUserFkRegister": null
}