import { NextFunction, Request, Response } from "express";
import { z } from "zod";

export const categoryCreateValidator = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const validationSchema = z
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
  try {
    validationSchema.parse(req.body);
    next();
    return;
  } catch (error) {
    next(error);
    return;
  }
};
