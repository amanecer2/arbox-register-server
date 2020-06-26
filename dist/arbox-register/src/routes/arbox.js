"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const arboxRouter = express.Router();
const router = (users) => {
    arboxRouter.get('/register-user', (req, res) => {
        const { user } = req.body;
        const user = users.get(user.id);
        if (!user) {
            users.set(user.id, user);
        }
    });
    arboxRouter.get('/', (req, res) => {
        res.json({ helo: 1 });
    });
    arboxRouter.post('/', (req, res) => {
        const { items, customerID } = req.body;
        res.json({ helo: 1 });
    });
    return arboxRouter;
};
exports.default = router;
//# sourceMappingURL=arbox.js.map