import { NextFunction, Request, Response } from "express";
import { z } from "zod";

export const toppingCreateValidationSchema = z
  .object({
    name: z.string(),
    image: z.string(),
    price: z.number(),
    restaurantId: z.number(),
    isPublished: z.boolean().optional(),
  })
  .strict();

export const toppingQueryValidationSchema = z.object({
  page: z.number().optional(),
  per_page: z.number().optional(),
  search: z.string().optional(),
});

export const toppingCreateValidator = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    toppingCreateValidationSchema.parse(req.body);
    toppingQueryValidationSchema.parse(req.query);
    next();
    return;
  } catch (error) {
    next(error);
    return;
  }
};
