/* eslint-disable @typescript-eslint/no-unsafe-argument */
import express, { Router } from "express";
import CategoriesController from "@/categories/controller.js";
import CategoriesService from "@/categories/service.js";
import { Category } from "@/categories/model.js";
import authenticate from "@/common/middlewares/authenticate.js";
import authorization from "@/common/middlewares/authorization.js";
import logger from "@/config/logger.js";
import { ROLES } from "@/common/lib/constants.js";
import { categoryCreateValidator } from "@/categories/validator.js";

const router = Router();

const categoriesService = new CategoriesService(Category);
const categoriesController = new CategoriesController(
  categoriesService,
  logger,
);

router.post(
  "/",
  authenticate as unknown as express.RequestHandler,
  authorization([
    ROLES.ADMIN,
    ROLES.MANAGER,
  ]) as unknown as express.RequestHandler,
  categoryCreateValidator,
  categoriesController.create.bind(categoriesController),
);

router.get(
  "/",
  authenticate as unknown as express.RequestHandler,
  authorization([
    ROLES.ADMIN,
    ROLES.MANAGER,
  ]) as unknown as express.RequestHandler,
  categoriesController.findAll.bind(categoriesController),
);

router.get(
  "/:id",
  authenticate as unknown as express.RequestHandler,
  authorization([
    ROLES.ADMIN,
    ROLES.MANAGER,
  ]) as unknown as express.RequestHandler,
  categoriesController.findOne.bind(categoriesController),
);

router.put(
  "/:id",
  authenticate as unknown as express.RequestHandler,
  authorization([
    ROLES.ADMIN,
    ROLES.MANAGER,
  ]) as unknown as express.RequestHandler,
  categoriesController.update.bind(categoriesController),
);

router.delete(
  "/:id",
  authenticate as unknown as express.RequestHandler,
  authorization([
    ROLES.ADMIN,
    ROLES.MANAGER,
  ]) as unknown as express.RequestHandler,
  categoriesController.delete.bind(categoriesController),
);

export default router;
