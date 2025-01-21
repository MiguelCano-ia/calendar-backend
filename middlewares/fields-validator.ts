import { validationResult } from "express-validator";
import type { Request, Response, NextFunction } from "express";

export const fieldsValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      ok: false,
      errors: errors.mapped(),
    });
    return;
  }
  next();
};
