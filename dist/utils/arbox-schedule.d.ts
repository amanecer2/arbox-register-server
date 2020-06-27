import { IScheduleItem } from "../interface/schedule";
export declare class ArboxScheduleService {
    users: IUserObject;
    schedule: IUsersSchedule;
    arboxSchedule: ArboxSchedule;
    restoreData(data: any): void;
    _restoreUsers(data: any): void;
    _restoreSchsule(data: any): void;
    getUser(id: any): IUser;
    setUser(user: IUser): void;
    removeUser(user: IUser): boolean;
    setUserSchedule(_user: IUser, schedule: IScheduleItem): boolean;
    removeUserSchedule(userId: any, scheduleId: number): boolean;
    getUserSchedule(userId: any): IScheduleItem[];
    save(): void;
}
export declare class ArboxSchedule {
    private scheduleJob;
    startSchedule(scheduleItem: IScheduleItem, fetch: () => Promise<any>): void;
    removeSchedule(scheduleItemId: number): boolean;
}
export interface IUserObject {
    [userId: string]: IUser;
}
export declare class User implements IUser {
    userFk: number;
    membrshipUserFk: number;
    token: string;
    constructor(userFk: number, membrshipUserFk: number, token: string);
}
export interface IUser {
    userFk: number;
    membrshipUserFk: number;
    token: string;
}
export interface IUsersSchedule {
    [userId: string]: IScheduleItem[];
}
export declare const fakeScheduleItem: {
    "category": string;
    "schedule": {
        "id": number;
        "boxFk": number;
        "workoutId": number;
        "date": string;
        "time": string;
        "maxUsers": number;
        "minUsers": number;
        "liveLink": null;
        "cancelLimit": null;
        "coachFk": number;
        "boxCategoryFk": number;
        "locationsBoxFk": number;
        "enableRegistrationTime": number;
        "disableCancellationTime": number;
        "enableLateCancellation": number;
        "seriesFk": number;
        "status": string;
        "transparent": number;
        "endTime": string;
        "cancelledBy": null;
    };
    "numberOfUsers": number;
    "users": {
        "id": number;
        "firstName": string;
        "lastName": string;
        "image": null;
    }[];
    "alreadyMember": boolean;
    "coach": string;
    "standbyUser": boolean;
    "membershipUserFkRegister": null;
};
