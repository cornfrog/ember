import { Router } from "express";
import create_settings from "./create_settings.js";
import update_settings from "./update_settings.js";
import get_settings from "./get_settings.js";

const settings_routes = Router();

settings_routes.use("/create-settings", create_settings);
settings_routes.use("/update-settings", update_settings);
settings_routes.use("/get-settings", get_settings);

export default settings_routes;