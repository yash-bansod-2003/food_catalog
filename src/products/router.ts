/* eslint-disable @typescript-eslint/no-unsafe-argument */
import express, { Router } from "express";
import ProductsController from "@/products/controller.js";
import ProductsService from "@/products/service.js";
import { Product } from "@/products/model.js";
import authenticate from "@/common/middlewares/authenticate.js";
import authorization from "@/common/middlewares/authorization.js";
import logger from "@/config/logger.js";
import { ROLES } from "@/common/lib/constants.js";
import { productCreateValidator } from "@/products/validator.js";

const router = Router();

const productsService = new ProductsService(Product);
const productsController = new ProductsController(productsService, logger);

router.post(
  "/",
  authenticate as unknown as express.RequestHandler,
  authorization([
    ROLES.ADMIN,
    ROLES.MANAGER,
  ]) as unknown as express.RequestHandler,
  productCreateValidator,
  productsController.create.bind(productsController),
);

router.get(
  "/",
  authenticate as unknown as express.RequestHandler,
  authorization([
    ROLES.ADMIN,
    ROLES.MANAGER,
  ]) as unknown as express.RequestHandler,
  productsController.findAll.bind(productsController),
);

router.get(
  "/:id",
  authenticate as unknown as express.RequestHandler,
  authorization([
    ROLES.ADMIN,
    ROLES.MANAGER,
  ]) as unknown as express.RequestHandler,
  productsController.findOne.bind(productsController),
);

router.put(
  "/:id",
  authenticate as unknown as express.RequestHandler,
  authorization([
    ROLES.ADMIN,
    ROLES.MANAGER,
  ]) as unknown as express.RequestHandler,
  productsController.update.bind(productsController),
);

router.delete(
  "/:id",
  authenticate as unknown as express.RequestHandler,
  authorization([
    ROLES.ADMIN,
    ROLES.MANAGER,
  ]) as unknown as express.RequestHandler,
  productsController.delete.bind(productsController),
);

export default router;
