/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";
import ProductsController from "@/products/controller";
import ProductsService from "@/products/service";
import { Product } from "@/products/model";
import authenticate from "@/common/middlewares/authenticate";
import authorization from "@/common/middlewares/authorization";
import logger from "@/config/logger";
import { ROLES } from "@/common/lib/constants";
import { productCreateValidator } from "@/products/validator";

const router = Router();

const productsService = new ProductsService(Product);
const productsController = new ProductsController(productsService, logger);

router.post(
  "/",
  authenticate,
  authorization([ROLES.ADMIN, ROLES.MANAGER]),
  productCreateValidator,
  productsController.create.bind(productsController),
);

router.get(
  "/",
  authenticate,
  authorization([ROLES.ADMIN, ROLES.MANAGER]),
  productsController.findAll.bind(productsController),
);

router.get(
  "/:id",
  authenticate,
  authorization([ROLES.ADMIN, ROLES.MANAGER]),
  productsController.findOne.bind(productsController),
);

router.put(
  "/:id",
  authenticate,
  authorization([ROLES.ADMIN, ROLES.MANAGER]),
  productsController.update.bind(productsController),
);

router.delete(
  "/:id",
  authenticate,
  authorization([ROLES.ADMIN, ROLES.MANAGER]),
  productsController.delete.bind(productsController),
);

export default router;
