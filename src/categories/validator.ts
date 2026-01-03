import { NextFunction, Request, Response } from "express";
import { z } from "zod";

export const categoryCreateValidationSchema = z
  .object({
    name: z.string(),
    priceConfigurations: z.record(
      z.object({
        priceType: z.enum(["base", "additional"]),
        availableOptions: z.array(z.string()),
      }),
    ),
    attributes: z.array(
      z.object({
        widgetType: z.enum(["switch", "radio"]),
        defaultValue: z.string(),
        availableOptions: z.array(z.string()),
      }),
    ),
  })
  .strict();

export const categoryQueryValidationSchema = z.object({
  page: z.number().optional(),
  per_page: z.number().optional(),
  search: z.string().optional(),
});

export const categoryCreateValidator = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    categoryCreateValidationSchema.parse(req.body);
    categoryQueryValidationSchema.parse(req.query);
    next();
    return;
  } catch (error) {
    next(error);
    return;
  }
};
