const express = require('express');
const router = express.Router();
const Admincontroller = require("../controller/Account/AdminController");
const Logoutcontroller = require("../controller/Account/logout")
const dashboardcontroller = require("../controller/Account/Dashboard")

router.post("/admin/register",Admincontroller.adminsignup)
router.post("/admin/login",Admincontroller.adminlogin)
router.get("/dashboard",dashboardcontroller.dashboard)
router.get("/logout", Logoutcontroller.logout);
module.exports = router;