/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";
import CategoriesController from "@/categories/controller";
import CategoriesService from "@/categories/service";
import { Category } from "@/categories/model";
import authenticate from "@/common/middlewares/authenticate";
import authorization from "@/common/middlewares/authorization";
import logger from "@/config/logger";
import { ROLES } from "@/common/lib/constants";
import { categoryCreateValidator } from "@/categories/validator";

const router = Router();

const categoriesService = new CategoriesService(Category);
const categoriesController = new CategoriesController(
  categoriesService,
  logger,
);

router.post(
  "/",
  authenticate,
  authorization([ROLES.ADMIN, ROLES.MANAGER]),
  categoryCreateValidator,
  categoriesController.create.bind(categoriesController),
);

router.get(
  "/",
  authenticate,
  authorization([ROLES.ADMIN, ROLES.MANAGER]),
  categoriesController.findAll.bind(categoriesController),
);

router.get(
  "/:id",
  authenticate,
  authorization([ROLES.ADMIN, ROLES.MANAGER]),
  categoriesController.findOne.bind(categoriesController),
);

router.put(
  "/:id",
  authenticate,
  authorization([ROLES.ADMIN, ROLES.MANAGER]),
  categoriesController.update.bind(categoriesController),
);

router.delete(
  "/:id",
  authenticate,
  authorization([ROLES.ADMIN, ROLES.MANAGER]),
  categoriesController.delete.bind(categoriesController),
);

export default router;
