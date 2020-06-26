import chalk from "chalk";

const response = chalk.bold.green;

export const answerHandle = (answer: any) => {
    console.log(response(answer));

};