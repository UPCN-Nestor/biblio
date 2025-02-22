"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidISBN = void 0;
var isValidISBN = function (code) {
    return /^(978|979)/.test(code);
};
exports.isValidISBN = isValidISBN;
