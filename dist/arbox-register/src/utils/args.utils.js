"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.args = process.argv
    .slice(2)
    .map(arg => arg.split('='))
    .reduce((args, [value, key]) => {
    args[value] = key;
    return args;
}, {});
//# sourceMappingURL=args.utils.js.map