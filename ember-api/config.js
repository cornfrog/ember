import { config } from "dotenv";

config();

export const CONFIG = {
    port: process.env.PORT || process.env.DEV_PORT
}