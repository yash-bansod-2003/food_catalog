import { Request, Response, NextFunction } from "express";
import ProductService from "./service";
import { IProduct } from "./model";
import { Logger } from "winston";
import createHttpError from "http-errors";

class ProductsController {
  constructor(
    private readonly productService: ProductService,
    private readonly logger: Logger,
  ) {}

  async create(req: Request, res: Response, next: NextFunction) {
    this.logger.info(`Creating product with data: ${JSON.stringify(req.body)}`);
    const createProductDto = req.body as IProduct;

    const product = await this.productService.findOne({
      name: createProductDto.name,
    });

    if (product) {
      this.logger.error(
        `Product with name: ${createProductDto.name} already exists`,
      );
      next(createHttpError(400, "product already exists"));
      return;
    }

    try {
      const product = await this.productService.create(createProductDto);
      this.logger.info(`Product created with id: ${String(product._id)}`);
      res.json({ id: product._id });
      return;
    } catch (error) {
      this.logger.error(`Error creating product: ${(error as Error).message}`);
      next(createHttpError(500, "internal server error"));
      return;
    }
  }

  async findAll(req: Request, res: Response, next: NextFunction) {
    this.logger.info("Fetching all products");
    try {
      const products = await this.productService.findAll(req.query);
      this.logger.info(`Fetched ${products.length} products`);
      return res.json(products);
    } catch (error) {
      this.logger.error(
        `Error fetching all products: ${(error as Error).message}`,
      );
      next(createHttpError(500, "internal server error"));
    }
  }

  async findOne(req: Request, res: Response, next: NextFunction) {
    this.logger.info(`Fetching product with id: ${req.params.id}`);
    try {
      const product = await this.productService.findOne({
        _id: req.params.id,
      });
      if (!product) {
        this.logger.error(`Product with id: ${req.params.id} not found`);
        return next(createHttpError(404, "product not found"));
      }
      this.logger.info(`Fetched product with id: ${String(product._id)}`);
      res.json(product);
    } catch (error) {
      this.logger.error(
        `Error fetching product with id: ${req.params.id}: ${(error as Error).message}`,
      );
      next(createHttpError(500, "internal server error"));
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    this.logger.info(
      `Updating product with id: ${req.params.id} with data: ${JSON.stringify(req.body)}`,
    );
    const updateProductDto = req.body as Partial<IProduct>;

    const product = await this.productService.findOne({ _id: req.params.id });

    if (!product) {
      this.logger.error(`Product with id: ${req.params.id} not found`);
      return next(createHttpError(400, "product not found"));
    }

    try {
      const product = await this.productService.update(
        { _id: req.params.id },
        updateProductDto,
      );
      this.logger.info(`Product with id: ${req.params.id} updated`);
      res.json(product);
    } catch (error) {
      this.logger.error(
        `Error updating product with id: ${req.params.id}: ${(error as Error).message}`,
      );
      next(createHttpError(500, "internal server error"));
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    this.logger.info(`Deleting product with id: ${req.params.id}`);
    try {
      const product = await this.productService.findOne({
        _id: req.params.id,
      });

      if (!product) {
        this.logger.error(`Product with id: ${req.params.id} not found`);
        return next(createHttpError(400, "product not found"));
      }

      const deletedProduct = await this.productService.delete({
        _id: req.params.id,
      });
      this.logger.info(`Product with id: ${req.params.id} deleted`);
      return res.json(deletedProduct);
    } catch (error) {
      this.logger.error(
        `Error deleting product with id: ${req.params.id}: ${(error as Error).message}`,
      );
      next(createHttpError(500, "internal server error"));
    }
  }
}

export default ProductsController;
