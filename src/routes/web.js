import express from "express";
import { getHomePage, postWebhook, getWebhook } from "../controllers/homeController";

const router = express.Router();

const initWebRoutes = (app) => {
    router.get("/", getHomePage);
    
    router.post("/webhook", postWebhook);
    router.get("/webhook", getWebhook);

    return app.use("/", router);
}

module.exports = initWebRoutes;