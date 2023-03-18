const express = require("express");
const router = express.Router();

const { login, register } = require("../controllers/auth");

router.get("/data", (req, res) => res.send(" route testing!"));
router.post("/register", register);
router.post("/login", login);

module.exports = router;
