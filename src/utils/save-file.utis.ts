import * as fs from "fs";
import {ArboxScheduleService} from "./arbox-schedule";

export const saveData = (arboxScheduleService: ArboxScheduleService) => {
    const data = {
        users: arboxScheduleService.users,
        schedule: arboxScheduleService.schedule
    };
    fs.writeFile('data/data.json', JSON.stringify(data), function (err) {
        if (err) return console.log(err);
        console.log('saved');
    });
}
