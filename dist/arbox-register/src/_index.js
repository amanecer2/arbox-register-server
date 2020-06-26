#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = require("inquirer");
const chalk_1 = require("chalk");
const questions_1 = require("./resource/questions");
const string_constant_1 = require("./constant/string.constant");
const answer_utils_1 = require("./utils/answer.utils");
const response = chalk_1.default.bold.green;
function resumeHandler() {
    return __awaiter(this, void 0, void 0, function* () {
        const answer = yield inquirer_1.prompt({
            type: "list",
            name: string_constant_1.STRING.QUESTIONS,
            message: "Please fill the following questions",
            choices: [...Object.keys(questions_1.questions), string_constant_1.STRING.EXIT]
        });
        const resumeOptions = answer[string_constant_1.STRING.QUESTIONS];
        if (resumeOptions === string_constant_1.STRING.EXIT) {
            console.log(response("Thank you, see you latter"));
            return;
        }
        var option = answer[string_constant_1.STRING.QUESTIONS];
        console.log(response("--------------------------------------"));
        console.log(option);
        console.log(response("--------------------------------------"));
        answer_utils_1.answerHandle(resumeOptions);
        /*const choice: any = await prompt({
            type: "list",
            name: "exitBack",
            message: "Go back or Exit?",
            choices: ["Back", "Exit"]
        });
    
        if (choice.exitBack == "Back") {
            resumeHandler();
        } else {
          return;
        }*/
        return;
    });
}
;
resumeHandler().then().catch();
//# sourceMappingURL=_index.js.map