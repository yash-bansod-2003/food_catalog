import { Request, Response, NextFunction } from "express";
import { Logger } from "winston";
import createHttpError from "http-errors";
import CategoryService from "./service.js";
import { ICategory } from "./model.js";

class CategoriesController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly logger: Logger,
  ) {}

  async create(req: Request, res: Response, next: NextFunction) {
    this.logger.info(
      `Creating category with data: ${JSON.stringify(req.body)}`,
    );
    const createCategoryDto = req.body as ICategory;

    const category = await this.categoryService.findOne({
      name: createCategoryDto.name,
    });

    if (category) {
      this.logger.error(
        `Category with name: ${createCategoryDto.name} already exists`,
      );
      next(createHttpError(400, "category already exists"));
      return;
    }

    try {
      const category = await this.categoryService.create(createCategoryDto);
      this.logger.info(`Category created with id: ${String(category._id)}`);
      res.json({ id: category._id });
      return;
    } catch (error) {
      this.logger.error(`Error creating category: ${(error as Error).message}`);
      next(createHttpError(500, "internal server error"));
      return;
    }
  }

  async findAll(req: Request, res: Response, next: NextFunction) {
    this.logger.info("Fetching all categories");
    try {
      const categories = await this.categoryService.findAll(req.query);
      this.logger.info(`Fetched ${categories.length} categories`);
      return res.json(categories);
    } catch (error) {
      this.logger.error(
        `Error fetching all categories: ${(error as Error).message}`,
      );
      next(createHttpError(500, "internal server error"));
    }
  }

  async findOne(req: Request, res: Response, next: NextFunction) {
    this.logger.info(`Fetching category with id: ${req.params.id}`);
    try {
      const category = await this.categoryService.findOne({
        _id: req.params.id,
      });
      if (!category) {
        this.logger.error(`Category with id: ${req.params.id} not found`);
        return next(createHttpError(404, "category not found"));
      }
      this.logger.info(`Fetched category with id: ${String(category._id)}`);
      res.json(category);
    } catch (error) {
      this.logger.error(
        `Error fetching category with id: ${req.params.id}: ${(error as Error).message}`,
      );
      next(createHttpError(500, "internal server error"));
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    this.logger.info(
      `Updating category with id: ${req.params.id} with data: ${JSON.stringify(req.body)}`,
    );
    const updateCategoryDto = req.body as Partial<ICategory>;

    const category = await this.categoryService.findOne({ _id: req.params.id });

    if (!category) {
      this.logger.error(`Category with id: ${req.params.id} not found`);
      return next(createHttpError(400, "restaurant not found"));
    }

    try {
      const category = await this.categoryService.update(
        { _id: req.params.id },
        updateCategoryDto,
      );
      this.logger.info(`Category with id: ${req.params.id} updated`);
      res.json(category);
    } catch (error) {
      this.logger.error(
        `Error updating category with id: ${req.params.id}: ${(error as Error).message}`,
      );
      next(createHttpError(500, "internal server error"));
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    this.logger.info(`Deleting category with id: ${req.params.id}`);
    try {
      const category = await this.categoryService.findOne({
        _id: req.params.id,
      });

      if (!category) {
        this.logger.error(`Category with id: ${req.params.id} not found`);
        return next(createHttpError(400, "restaurant not found"));
      }

      const deletedCategory = await this.categoryService.delete({
        _id: req.params.id,
      });
      this.logger.info(`Category with id: ${req.params.id} deleted`);
      return res.json(deletedCategory);
    } catch (error) {
      this.logger.error(
        `Error deleting category with id: ${req.params.id}: ${(error as Error).message}`,
      );
      next(createHttpError(500, "internal server error"));
    }
  }
}

export default CategoriesController;
