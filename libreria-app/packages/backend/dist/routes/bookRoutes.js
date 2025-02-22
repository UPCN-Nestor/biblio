"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const BookController_1 = __importDefault(require("../controllers/BookController"));
const validators_1 = require("../middleware/validators");
const router = (0, express_1.Router)();
router.get('/', BookController_1.default.all);
router.get('/isbn/:isbn', BookController_1.default.getBookByISBN);
router.get('/:id', BookController_1.default.one);
router.post('/', validators_1.validateBook, BookController_1.default.create);
router.put('/:id', validators_1.validateBook, BookController_1.default.update);
router.delete('/:id', BookController_1.default.delete);
exports.default = router;
