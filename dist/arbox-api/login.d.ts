import { ILogin } from "../interface/login.interface";
export declare const BASE_URL = "https://apiapp.arboxapp.com/index.php/api/v1";
export declare const API: {
    login: (email: string) => string;
    scheduleUser: () => string;
    getWeeklyRegisteredUserSchedule: () => string;
    scheduleByDateList: (boxID: number, userId: number, date: string | Date) => string;
    getBoxData: (userId: any) => string;
    deleteWatingList: (userId: any, wodId: any) => string;
    enterWaitList: () => string;
    enterWorout: () => string;
};
export declare const login: ({ email, password }: {
    email: string;
    password: string;
}) => Promise<ILogin.LoginInterface>;
