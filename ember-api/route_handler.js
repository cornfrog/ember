import { Router } from "express";
import database_routes from "./routes/database/database_routes.js";
import profile_routes from "./routes/profile/profile_routes.js";
import project_routes from "./routes/project/project_routes.js";
import settings_routes from "./routes/settings/settings_routes.js";

const route_handler = Router();

route_handler.use("/database", database_routes);
route_handler.use("/profile", profile_routes);
route_handler.use("/project", project_routes);
route_handler.use("/settings", settings_routes);

export default route_handler;