#!/usr/bin/env node
"use strict";
import {prompt} from 'inquirer';
import chalk from 'chalk';

import {questions}  from './resource/questions'
import {STRING} from "./constant/string.constant";
import {answerHandle} from "./utils/answer.utils";

const response = chalk.bold.green;


async function resumeHandler () {
    const answer = await prompt({
        type: "list",
        name: STRING.QUESTIONS,
        message: "Please fill the following questions",
        choices: [...Object.keys(questions), STRING.EXIT]
    }) as any;

    const resumeOptions = answer[STRING.QUESTIONS];

    if (resumeOptions === STRING.EXIT) {
        console.log(response("Thank you, see you latter"));
        return
    }
    var option = answer[STRING.QUESTIONS] as any;
    console.log(response("--------------------------------------"));
    console.log(option);
    console.log(response("--------------------------------------"));

    answerHandle(resumeOptions);

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
    return
};


resumeHandler().then().catch();