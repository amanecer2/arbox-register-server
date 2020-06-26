import * as fs from "fs";
import {ArboxScheduleService} from "./arbox-schedule";

export const saveData = (arboxScheduleService: ArboxScheduleService) => {
    const data = {
        users: JSON.stringify(arboxScheduleService.users),
        schedule: JSON.stringify(arboxScheduleService.schedule)
    };
    fs.writeFile('src/data/data.json', JSON.stringify(data), function (err) {
        if (err) return console.log(err);
        console.log('saved');
    });
}
