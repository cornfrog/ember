import { Router } from "express";
import get_databases from "./get_databases.js";
import get_database from "./get_database.js";
import update_database from "./update_database.js";
import create_database from "./create_database.js";
import delete_database from "./delete_database.js";

const database_routes = Router();

database_routes.use("/get-databases", get_databases);
database_routes.use("/get-database", get_database);
database_routes.use("/update-database", update_database);
database_routes.use("/create-database", create_database);
database_routes.use("/delete-database", delete_database);

export default database_routes;