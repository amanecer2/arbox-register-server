import { ILogin } from "../../../arbox-register-interface/interface";
export declare type IUserMap = Map<number, ILogin.LoginInterface>;
export declare module ILogin {
    interface LocationBox {
        id: number;
        location: string;
        boxFk: number;
        address: string;
        logo: string;
        timeZone?: any;
        rivhitPaymentGroupPrivateToken?: any;
        rivhitPaymentGroupId: string;
    }
    interface User {
        id: number;
        email: string;
        firstName: string;
        lastName: string;
        originalImage: string;
        image: string;
        birthday: string;
        gender: string;
        phone: string;
        active: number;
        suspend: number;
        medicalCert: number;
        weight: number;
        height: number;
        country?: any;
        city?: any;
        address?: any;
        locationBox: LocationBox;
        restricted: number;
        timeFormatPreferred: string;
        resetPasswordToken?: any;
        counterFailLogin: number;
        blockUntilLogin?: any;
        lastLogin: string;
    }
    interface Role {
        id: number;
        role: string;
        description: string;
    }
    interface LoginInterface {
        user: User;
        roles: Role[];
        token: string;
    }
}
