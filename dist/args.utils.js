"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.args = process.argv
    .slice(2)
    .map(function (arg) { return arg.split('='); })
    .reduce(function (args, _a) {
    var value = _a[0], key = _a[1];
    args[value] = key;
    return args;
}, {});
//# sourceMappingURL=args.utils.js.map