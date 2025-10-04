import { z } from "zod";
import { NextFunction, Request, Response } from "express";

export const productCreateValidator = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const validationSchema = z
    .object({
      name: z.string(),
      discription: z.string(),
      image: z.string(),
      priceConfigurations: z.record(
        z.object({
          priceType: z.enum(["base", "additional"]),
          availableOptions: z.record(z.string(), z.number()),
        }),
      ),
      attributes: z.array(
        z.object({
          name: z.string(),
          value: z.union([z.string(), z.boolean(), z.number()]),
        }),
      ),
      restaurentId: z.number(),
      categoryId: z.string(),
      published: z.boolean(),
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
