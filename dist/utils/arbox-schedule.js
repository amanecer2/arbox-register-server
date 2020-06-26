"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const schedule = require("node-schedule");
const date_fns_1 = require("date-fns");
const login_1 = require("../arbox-api/login");
const save_file_utis_1 = require("./save-file.utis");
const fetch_1 = require("./fetch");
class ArboxScheduleService {
    constructor() {
        this.users = {};
        this.schedule = {};
        this.arboxSchedule = new ArboxSchedule();
    }
    restoreData(data) {
        const _dat = JSON.parse(data);
        this.users = JSON.parse(_dat.users);
        this.schedule = JSON.parse(_dat.schedule);
    }
    getUser(id) {
        return this.users[id];
    }
    setUser(user) {
        this.users[user.userFk] = user;
        this.users[user.token] = user;
        this.save();
    }
    removeUser(user) {
        if (this.users[user.userFk]) {
            delete this.users[user.userFk];
            delete this.users[user.token];
            this.save();
            return true;
        }
        return false;
    }
    setUserSchedule(_user, schedule) {
        if (!this.schedule[_user.userFk]) {
            this.schedule[_user.userFk] = [];
        }
        if (this.schedule[_user.userFk].find((s) => s.schedule.id === schedule.schedule.id)) {
            return false;
        }
        const user = this.users[_user.userFk];
        const fetch = fetch_1.arboxAjax(user.token)()(login_1.API.scheduleUser(), {
            scheduleFk: schedule.schedule.id,
            userFk: user.userFk,
            membrshipUserFk: user.membrshipUserFk
        });
        this.schedule[_user.userFk].push(schedule);
        this.arboxSchedule.startSchedule(schedule, fetch);
        return true;
    }
    removeUserSchedule(userId, scheduleId) {
        if (!this.schedule[userId])
            return false;
        const index = this.schedule[userId].findIndex((s) => s.schedule.id === scheduleId);
        if (index > -1) {
            this.arboxSchedule.removeSchedule(this.schedule[userId][index].schedule.id);
            this.schedule[userId] = this.schedule[userId].filter((_, _index) => _index !== index);
            return true;
        }
        return false;
    }
    getUserSchedule(userId) {
        return this.schedule[userId];
    }
    save() {
        save_file_utis_1.saveData(this);
    }
}
exports.ArboxScheduleService = ArboxScheduleService;
class ArboxSchedule {
    constructor() {
        this.scheduleJob = {};
    }
    startSchedule(scheduleItem, fetch) {
        const workoutDateWithTime = `${scheduleItem.schedule.date} ${scheduleItem.schedule.time}`;
        let timeBeforeAllow = date_fns_1.addHours(new Date(workoutDateWithTime), -scheduleItem.schedule.enableRegistrationTime);
        if (+timeBeforeAllow < +new Date() || scheduleItem.schedule.enableRegistrationTime === 0) {
            timeBeforeAllow = new Date();
        }
        const startTime = new Date(+new Date(timeBeforeAllow) - (3 * 10 * 1000)); // 30 seconds before
        const endTime = new Date(+new Date(timeBeforeAllow) + (2 * 60 * 1000)); // 2 min after
        console.log('workoutDateWithTime', workoutDateWithTime);
        console.log('timeBeforeAllow', timeBeforeAllow);
        console.log('startTime', startTime);
        console.log('endTime', endTime);
        this.scheduleJob[scheduleItem.schedule.id] = schedule.scheduleJob({
            start: startTime,
            end: endTime,
            rule: '*/10 * * * * *'
        }, () => __awaiter(this, void 0, void 0, function* () {
            console.log('trying to sign in to ', scheduleItem.category, scheduleItem.schedule.id, new Date().toISOString());
            if (fetch) {
                try {
                    const res = yield fetch();
                    this.removeSchedule(scheduleItem.schedule.id);
                    console.log('your in the workout!!', scheduleItem.schedule.id);
                }
                catch (e) {
                    this.removeSchedule(scheduleItem.schedule.id);
                    console.log('shoething went wrong', e);
                }
            }
        }));
    }
    removeSchedule(scheduleItemId) {
        if (this.scheduleJob[scheduleItemId]) {
            this.scheduleJob[scheduleItemId].cancel();
            return true;
        }
        return false;
    }
}
exports.ArboxSchedule = ArboxSchedule;
class User {
    constructor(userFk, membrshipUserFk, token) {
        this.userFk = userFk;
        this.membrshipUserFk = membrshipUserFk;
        this.token = token;
    }
}
exports.User = User;
exports.fakeScheduleItem = {
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
};
//# sourceMappingURL=arbox-schedule.js.map