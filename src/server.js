require("dotenv").config();
import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./configs/viewEngine";
import webRoutes from "./routes/web";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));
//config view engine
viewEngine(app);
//config web routes
webRoutes(app);

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log("Bot is running...");
})