import express from "express";
import cors from "cors";
import { CONFIG } from "./config.js";
import route_handler from "./route_handler.js";

const ember_api = express();

ember_api.use(cors());
ember_api.use(express.json());

ember_api.use("/ember", route_handler);

ember_api.listen(CONFIG.port, () => {
    console.log(`Ember Api running on port: ${CONFIG.port}`);
});