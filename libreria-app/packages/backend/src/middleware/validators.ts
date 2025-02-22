import { body, ValidationChain } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const validateBook: ValidationChain[] = [
  body('title')
    .notEmpty()
    .withMessage('El título es requerido')
    .trim()
    .isLength({ min: 1, max: 255 })
    .withMessage('El título debe tener entre 1 y 255 caracteres'),
  
  body('author')
    .notEmpty()
    .withMessage('El autor es requerido')
    .trim()
    .isLength({ min: 1, max: 255 })
    .withMessage('El autor debe tener entre 1 y 255 caracteres'),
  
  body('isbn')
    .notEmpty()
    .withMessage('El ISBN es requerido')
    .trim()
    .matches(/^(?:\d{10}|\d{13})$/)
    .withMessage('El ISBN debe tener 10 o 13 dígitos'),
  
  body('price')
    .notEmpty()
    .withMessage('El precio es requerido')
    .isFloat({ min: 0 })
    .withMessage('El precio debe ser un número positivo'),
  
  body('stock')
    .notEmpty()
    .withMessage('El stock es requerido')
    .isInt({ min: 0 })
    .withMessage('El stock debe ser un número entero positivo'),
]; 