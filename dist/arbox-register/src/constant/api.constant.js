"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BASE_URL = 'https://apiapp.arboxapp.com/index.php/api/v1';
exports.API = {
    login: (email) => `${exports.BASE_URL}/user/${email}/session`
};
//# sourceMappingURL=api.constant.js.map