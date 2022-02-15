import fs from "fs";
import express from "express";
const router = express.Router();

interface User {
    id: number;
    name: string;
}

router.get("/users", (req, res, next) => {
    fs.readFile("test/users.json", (err, data) => { //Тестовый JSON со списком пользователей
        if (err) {
            res.status(400);
            throw new Error(err.message);
        };
        res.send(data);
    });
});
router.delete("/deleteUser", (req, res, next) => {

    let id: number = req.body;
    
    let data = fs.readFileSync("test/users.json");
    let dataArr: User[] = JSON.parse(data.toString());
    let delArrNumber = dataArr.findIndex(item => item.id === id);
    dataArr.splice(delArrNumber, 1);
    let result = JSON.stringify(dataArr);

    fs.writeFileSync("test/users.json", result, "utf8");
    res.status(200).end();
});
router.post("/addUser", (req, res, next) => {
    
    console.log(req.body)
});

export default router;