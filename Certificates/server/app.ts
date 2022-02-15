import path from "path";
import apiRouter from "./routes/api";
import express from "express";

const app = express();

const index: string = path.join(__dirname, "../client/public", "index.html");

app.use("/api/", apiRouter);

app.get("/build/*", (req, res) => {
    let fileName = path.join(__dirname, "../client", req.url);
    console.log("Перенаправление на файл клиента: " + req.url);
    res.sendFile(fileName);
});
app.get("/*", (req, res) => {
    res.sendFile(index);
});

const port = 3002;
app.listen(port, () => {
    console.log("Сервер запущен на порте: " + port);
});