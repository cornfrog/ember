import { Router } from "express";
import get_profile from "./get_profile.js";
import update_profile from "./update_profile.js";
import create_profile from "./create_profile.js";

const profile_routes = Router();

profile_routes.use("/get-profile", get_profile);
profile_routes.use("/update-profile", update_profile);
profile_routes.use("/create-profile", create_profile);

export default profile_routes;