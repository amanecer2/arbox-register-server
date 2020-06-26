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
const node_fetch_1 = require("node-fetch");
const date_fns_1 = require("date-fns");
exports.BASE_URL = 'https://apiapp.arboxapp.com/index.php/api/v1';
exports.API = {
    login: (email) => `${exports.BASE_URL}/user/${email}/session`,
    getWeeklyRegisteredUserSchedule: () => `${exports.BASE_URL}/getWeeklyRegisteredUserSchedule`,
    scheduleByDateList: (boxID, userId, date) => {
        const yyyyMMDD = date_fns_1.format(new Date(date), 'yyyy-MM-dd');
        return `${exports.BASE_URL}/scheduleByDateList/${boxID}/?date=${yyyyMMDD}&userId=${userId}}`;
    },
    getBoxData: (userId) => `${exports.BASE_URL}/userBox/${userId}`,
    deleteWatingList: (userId, wodId) => `${exports.BASE_URL}/scheduleStandby/${userId}/${wodId}`,
    enterWaitList: () => `${exports.BASE_URL}/scheduleStandby/create`,
    enterWorout: () => `${exports.BASE_URL}/scheduleUser` /// POST
};
exports.login = ({ email, password }) => __awaiter(this, void 0, void 0, function* () {
    const _body = JSON.stringify({
        password: 'AJRkuh1986',
        email: 'sh2le86@gmail.com'
    });
    return node_fetch_1.default(exports.API.login(email), {
        method: "POST",
        body: _body,
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => res.json());
});
//# sourceMappingURL=login.js.map