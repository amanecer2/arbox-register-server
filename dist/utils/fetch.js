"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = require("node-fetch");
exports.arboxAjax = token => (method = "POST") => (url, body) => () => {
    return node_fetch_1.default(url, {
        method,
        body: JSON.stringify(body),
        headers: {
            "accessToken": token,
            "Content-Type": "application/json"
        }
    }).then(res => res.json());
};
//# sourceMappingURL=fetch.js.map