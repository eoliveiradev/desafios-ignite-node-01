import express, { Router } from "express";
import swaggerUI from "swagger-ui-express";

import swaggerFile from "../swagger.json";

const docsRoutes = Router();

docsRoutes.use("/", swaggerUI.serve, swaggerUI.setup(swaggerFile));

export { docsRoutes };
