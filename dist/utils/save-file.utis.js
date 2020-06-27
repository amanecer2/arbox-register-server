"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
exports.saveData = (arboxScheduleService) => {
    const data = {
        users: arboxScheduleService.users,
        schedule: arboxScheduleService.schedule
    };
    fs.writeFile('dist/data/data.json', JSON.stringify(data), function (err) {
        if (err)
            return console.log(err);
        console.log('saved');
    });
};
//# sourceMappingURL=save-file.utis.js.map