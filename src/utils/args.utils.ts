export const args = process.argv
    .slice(2)
    .map(arg => arg.split('='))
    .reduce((args: any, [value, key]) => {
        args[value] = key;
        return args;
    }, {}) as any;