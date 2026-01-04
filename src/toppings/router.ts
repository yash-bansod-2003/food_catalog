/* eslint-disable @typescript-eslint/no-unsafe-argument */
import express, { Router } from "express";
import ToppingsController from "@/toppings/controller.js";
import ToppingsService from "@/toppings/service.js";
import { Topping } from "@/toppings/model.js";
import authenticate from "@/common/middlewares/authenticate.js";
import authorization from "@/common/middlewares/authorization.js";
import logger from "@/config/logger.js";
import { ROLES } from "@/common/lib/constants.js";
import { toppingCreateValidator } from "@/toppings/validator.js";

const router = Router();

const toppingsService = new ToppingsService(Topping);
const toppingsController = new ToppingsController(toppingsService, logger);

router.post(
  "/",
  authenticate as unknown as express.RequestHandler,
  authorization([
    ROLES.ADMIN,
    ROLES.MANAGER,
  ]) as unknown as express.RequestHandler,
  toppingCreateValidator,
  toppingsController.create.bind(toppingsController),
);

router.get(
  "/",
  authenticate as unknown as express.RequestHandler,
  authorization([
    ROLES.ADMIN,
    ROLES.MANAGER,
  ]) as unknown as express.RequestHandler,
  toppingsController.findAll.bind(toppingsController),
);

router.get(
  "/:id",
  authenticate as unknown as express.RequestHandler,
  authorization([
    ROLES.ADMIN,
    ROLES.MANAGER,
  ]) as unknown as express.RequestHandler,
  toppingsController.findOne.bind(toppingsController),
);

router.put(
  "/:id",
  authenticate as unknown as express.RequestHandler,
  authorization([
    ROLES.ADMIN,
    ROLES.MANAGER,
  ]) as unknown as express.RequestHandler,
  toppingsController.update.bind(toppingsController),
);

router.delete(
  "/:id",
  authenticate as unknown as express.RequestHandler,
  authorization([
    ROLES.ADMIN,
    ROLES.MANAGER,
  ]) as unknown as express.RequestHandler,
  toppingsController.delete.bind(toppingsController),
);

export default router;
