import { Request, Response, NextFunction } from "express";
import { Logger } from "winston";
import createHttpError from "http-errors";
import ToppingsService from "./service.js";
import { ITopping } from "./model.js";
import { ResponseWithMetadata } from "../common/types/index.js";
import { toppingQueryValidationSchema } from "./validator.js";
import { z } from "zod";

class ToppingsController {
  constructor(
    private readonly toppingsService: ToppingsService,
    private readonly logger: Logger,
  ) {}

  async create(req: Request, res: Response, next: NextFunction) {
    this.logger.info(`Creating topping with data: ${JSON.stringify(req.body)}`);
    const createToppingDto = req.body as ITopping;

    const topping = await this.toppingsService.findOne({
      name: createToppingDto.name,
    });

    if (topping) {
      this.logger.error(
        `Topping with name: ${createToppingDto.name} already exists`,
      );
      next(createHttpError(400, "topping already exists"));
      return;
    }

    try {
      const created = await this.toppingsService.create(createToppingDto);
      this.logger.info(`Topping created with id: ${String(created._id)}`);
      const response: ResponseWithMetadata<{ id: string }> = {
        data: { id: String(created._id) },
        success: true,
      };
      res.json(response);
      return;
    } catch (error) {
      this.logger.error(`Error creating topping: ${(error as Error).message}`);
      next(createHttpError(500, "internal server error"));
      return;
    }
  }

  async findAll(req: Request, res: Response, next: NextFunction) {
    this.logger.info("Fetching all toppings");
    try {
      const query = req.query as unknown as z.infer<
        typeof toppingQueryValidationSchema
      >;
      const page = query.page ? Number(query.page) : 1;
      const per_page = query.per_page ? Number(query.per_page) : 10;

      const toppings = await this.toppingsService.findAll(null, {
        skip: (page - 1) * per_page,
        limit: per_page,
      });

      this.logger.info(`Fetched ${toppings.length} toppings`);
      const response: ResponseWithMetadata<ITopping[]> = {
        data: toppings,
        success: true,
        meta: {
          total: toppings.length,
          page,
          per_page,
        },
      };
      return res.json(response);
    } catch (error) {
      this.logger.error(
        `Error fetching all toppings: ${(error as Error).message}`,
      );
      next(createHttpError(500, "internal server error"));
    }
  }

  async findOne(req: Request, res: Response, next: NextFunction) {
    this.logger.info(`Fetching topping with id: ${req.params.id}`);
    try {
      const topping = await this.toppingsService.findOne({
        _id: req.params.id,
      });
      if (!topping) {
        this.logger.error(`Topping with id: ${req.params.id} not found`);
        return next(createHttpError(404, "topping not found"));
      }
      this.logger.info(`Fetched topping with id: ${String(topping._id)}`);
      const response: ResponseWithMetadata<ITopping> = {
        data: topping,
        success: true,
      };
      res.json(response);
      return;
    } catch (error) {
      this.logger.error(
        `Error fetching topping with id: ${req.params.id}: ${(error as Error).message}`,
      );
      next(createHttpError(500, "internal server error"));
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    this.logger.info(
      `Updating topping with id: ${req.params.id} with data: ${JSON.stringify(req.body)}`,
    );
    const updateToppingDto = req.body as Partial<ITopping>;

    const topping = await this.toppingsService.findOne({ _id: req.params.id });

    if (!topping) {
      this.logger.error(`Topping with id: ${req.params.id} not found`);
      return next(createHttpError(400, "topping not found"));
    }

    try {
      const updated = await this.toppingsService.update(
        { _id: req.params.id },
        updateToppingDto,
      );
      this.logger.info(`Topping with id: ${req.params.id} updated`);
      res.json(updated);
    } catch (error) {
      this.logger.error(
        `Error updating topping with id: ${req.params.id}: ${(error as Error).message}`,
      );
      next(createHttpError(500, "internal server error"));
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    this.logger.info(`Deleting topping with id: ${req.params.id}`);
    try {
      const topping = await this.toppingsService.findOne({
        _id: req.params.id,
      });

      if (!topping) {
        this.logger.error(`Topping with id: ${req.params.id} not found`);
        return next(createHttpError(400, "topping not found"));
      }

      const deleted = await this.toppingsService.delete({
        _id: req.params.id,
      });
      this.logger.info(`Topping with id: ${req.params.id} deleted`);
      return res.json(deleted);
    } catch (error) {
      this.logger.error(
        `Error deleting topping with id: ${req.params.id}: ${(error as Error).message}`,
      );
      next(createHttpError(500, "internal server error"));
    }
  }
}

export default ToppingsController;
