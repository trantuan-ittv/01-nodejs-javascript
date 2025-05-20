// api nay theo tuna tuong duong route web
const express = require('express');
const { createUser, handleLogin, getUser, getAccount } = require('../controllers/userController');
const auth = require('../middleware/auth');
const delay = require('../middleware/delay');

const routerAPI = express.Router();
routerAPI.all("*", auth); // tat ca cac route xe chay qua auth

routerAPI.get("/", (req, res) => {
    return res.status(200).json("Hello world api tuna call form backend")
})

routerAPI.post("/register", createUser)
routerAPI.post("/login", handleLogin)
routerAPI.get("/user", getUser)
routerAPI.get("/account", delay, getAccount)


module.exports = routerAPI; //export default