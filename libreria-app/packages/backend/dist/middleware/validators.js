"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBook = void 0;
const express_validator_1 = require("express-validator");
exports.validateBook = [
    (0, express_validator_1.body)('title')
        .notEmpty()
        .withMessage('El título es requerido')
        .trim()
        .isLength({ min: 1, max: 255 })
        .withMessage('El título debe tener entre 1 y 255 caracteres'),
    (0, express_validator_1.body)('author')
        .notEmpty()
        .withMessage('El autor es requerido')
        .trim()
        .isLength({ min: 1, max: 255 })
        .withMessage('El autor debe tener entre 1 y 255 caracteres'),
    (0, express_validator_1.body)('isbn')
        .notEmpty()
        .withMessage('El ISBN es requerido')
        .trim()
        .matches(/^(?:\d{10}|\d{13})$/)
        .withMessage('El ISBN debe tener 10 o 13 dígitos'),
    (0, express_validator_1.body)('price')
        .notEmpty()
        .withMessage('El precio es requerido')
        .isFloat({ min: 0 })
        .withMessage('El precio debe ser un número positivo'),
    (0, express_validator_1.body)('stock')
        .notEmpty()
        .withMessage('El stock es requerido')
        .isInt({ min: 0 })
        .withMessage('El stock debe ser un número entero positivo'),
];
