import express from "express";
const router = express.Router();

//Ресурсы администратора сайта
import adminRouter from "./admin";
router.use("/admin", adminRouter);

export default router;