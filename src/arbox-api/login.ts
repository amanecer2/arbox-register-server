import fetch from "node-fetch";
import {ILogin} from "../interface/login.interface";

import { format } from 'date-fns';

export const BASE_URL = 'https://apiapp.arboxapp.com/index.php/api/v1';

export const API = {
    login: (email: string) => `${BASE_URL}/user/${email}/session`, // POST,
    scheduleUser: () => `${BASE_URL}/scheduleUser`, // POST
    getWeeklyRegisteredUserSchedule: () => `${BASE_URL}/getWeeklyRegisteredUserSchedule`, // POST
    scheduleByDateList: (boxID: number, userId: number, date: string | Date) => {
        const yyyyMMDD = format(new Date(date), 'yyyy-MM-dd');
        return `${BASE_URL}/scheduleByDateList/${boxID}/?date=${yyyyMMDD}&userId=${userId}}`;
    }, // GET
    getBoxData: (userId) => `${BASE_URL}/userBox/${userId}`,
    deleteWatingList: (userId, wodId) => `${BASE_URL}/scheduleStandby/${userId}/${wodId}`, // DELETE
    enterWaitList: () => `${BASE_URL}/scheduleStandby/create`, // POST
    enterWorout: () => `${BASE_URL}/scheduleUser` /// POST
};

export const login = async (
    {email, password}:
    {email: string, password: string}): Promise<ILogin.LoginInterface> => {
    const _body = JSON.stringify(
        {
            password: 'AJRkuh1986',
            email: 'sh2le86@gmail.com'
        });

    return fetch(API.login(email),
        {
            method: "POST",
            body: _body,
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json());
};

