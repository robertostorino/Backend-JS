import { check } from "express-validator";
import { validationResults } from "./validation.handler.js";

export const productValidator = [
    check("title").exists().notEmpty().isString(),
    check("price").exists().notEmpty().isDecimal(),
    check("thumbnail").exists().notEmpty().isString().isURL(),
    (req, res, next) => validationResults(req, res, next)
]