import express from "express";
import dotenv from "dotenv";
import nnnRouter from "nnn-router";
dotenv.config();
const port = process.env.PORT;
const app = express();
const router = nnnRouter({
    rootDir: "routes",
    baseRouter: express.Router(),
});
app.use(router);
app.get("/", (_req, res) => {
    res.send({
        message: "Hello world",
    });
});
app.listen(port, () => {
    console.log("Server listening on port " + port);
});
