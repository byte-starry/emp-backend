const express = require("express");
const cors = require("cors");

const adminController = require("../controller/admin");
const employeeController = require("../controller/emp");
const verify = require("./verify");

const router = express.Router();

router.post("/admin/signup", cors(), adminController.adminSignup);
router.post("/admin/signin", cors(), adminController.adminSignin);
router.get("/admin/getall", cors(), adminController.getAllEmployee);
router.delete(
  "/admin/delete/:id",
  cors(),
  adminController.deleteEmployee
);
router.post("/admin/add", verify, cors(), adminController.addEmp);
router.put("/admin/edit/:id", verify, cors(), adminController.editEmp);
router.post("/employee/signup", employeeController.employeeSignup);
router.post("/employee/signin", employeeController.employeeSignin);

module.exports = router;