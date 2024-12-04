import express, { Application } from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import errorHandler from "@/common/middlewares/error-handler.js";
import categoriesRouter from "@/categories/router.js";
import productsRouter from "@/products/router.js";

export const createServer = (): Application => {
  const app = express();
  app
    .use(cors({ origin: ["http://localhost:5173"], credentials: true }))
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(morgan("dev"))
    .use(cookieParser())
    .use(express.static("public"))
    .get("/status", (_, res) => {
      res.json({ ok: true });
    })
    .get("/message/:name", (req, res) => {
      res.json({ message: `hello ${req.params.name}` });
    })
    .use("/categories", categoriesRouter)
    .use("/products", productsRouter)
    .use(errorHandler as unknown as express.ErrorRequestHandler);
  return app;
};
