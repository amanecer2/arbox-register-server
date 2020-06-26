export interface IScheduleItem {
    alreadyMember: boolean;
    category: string;
    coach: string;
    membershipUserFkRegister: null;
    numberOfUsers: number;
    schedule: ISchedule;
    standbyUser: boolean;
    users: IUser[];
}
export interface ISchedule {
    boxCategoryFk: number;
    boxFk: number;
    cancelLimit: number & null;
    cancelledBy: number & null;
    coachFk: number | null;
    date: string;
    disableCancellationTime: number;
    enableLateCancellation: number;
    enableRegistrationTime: number;
    endTime: string;
    id: number;
    liveLink: null;
    locationsBoxFk: number;
    maxUsers: number;
    minUsers: number;
    seriesFk: number;
    status: string;
    time: string;
    transparent: number;
    workoutId: null;
}
interface IUser {
    firstName: string;
    id: number;
    image: string;
    lastName: string;
}
export {};
