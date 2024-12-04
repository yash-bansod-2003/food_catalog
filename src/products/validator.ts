import { z } from "zod";
import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

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
          availableOptions: z.record(z.number()),
        }),
      ),
      attributes: z.array(
        z.object({
          name: z.string(),
          value: z.string(),
        }),
      ),
      restaurentId: z.string(),
      categoryId: z.instanceof(mongoose.Types.ObjectId),
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
