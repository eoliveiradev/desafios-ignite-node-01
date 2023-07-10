import { Router } from "express";

import { docsRoutes } from "./docs.routes";
import { usersRoutes } from "./users.routes";

export const router = Router()
  .use("/users", usersRoutes)
  .use("/api-docs", docsRoutes);
