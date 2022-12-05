import express from "express";
import { getHomePage, postWebhook, getWebhook, setupProfile } from "../controllers/homeController";

import checkWifi from "../controllers/checkWifiController";

const router = express.Router();

const initWebRoutes = (app) => {
    router.get("/", getHomePage);

    router.post("/setup-profile", setupProfile);
    
    router.post("/webhook", postWebhook);
    router.get("/webhook", getWebhook);

    router.get("/checkWifi", checkWifi)

    return app.use("/", router);
}

module.exports = initWebRoutes;