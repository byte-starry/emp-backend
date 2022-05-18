const bcrypt = require("bcryptjs");
const Joi = require("@hapi/joi");
const jwt = require("jsonwebtoken");

const adminModel = require("../model/admin");
const employeeModel = require("../model/employee");

exports.employeeSignup = async (req, res) => {
const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  try {
    const signupSchema = Joi.object({
      fullName: Joi.string().min(3).required(),
      email: Joi.string().min(6).required().email(),
      password: Joi.string().min(8).required(),
    });

    const { error } = await signupSchema.validateAsync(req.body);

    if (error) {
      res.send(error.details[0].message);
    } else {
      const admin = new adminModel({
        fullName: req.body.fullName,
        email: req.body.email,
        password: hashedPassword,
      });

      const saveAdmin = await admin.save();
      res.send("Admin Signup Completed");
    }
  } catch (error) {
    res.send(error);
  }
};


exports.getAllEmployee = async (req, res) => {
    const employees = await employeeModel.find();
    try {
      res.send(employees);
    } catch (error) {
      res.send(error);
    }
  };
  
  exports.deleteEmployee = (req, res) => {
    employeeModel.deleteOne({ _id: req.params.id }, (error) => {
      if (error) {
        res.send(error);
      } else {
        res.send("Deleted");
      }
    });
  };

  exports.editEmployee = (req, res) => {
    employeeModel.findOne({ _id: req.params.id }, (error, employee) => {
      if (error) {
        res.send(error);
      } else {
        employee.fullName = req.body.fullName
          ? req.body.fullName
          : employee.fullName;
        employee.save((error) => {
          if (error) {
            res.send(error);
          } else {
            res.send("Edited");
          }
        });
      }
    });
  };

  exports.addEmployee = async (req, res) => {
    const emailExist = await employeeModel.findOne({ email: req.body.email });
    if (emailExist) {
      res.send("Email Already Exist");
      return;
    }
  
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
  
    try {
      const signupSchema = Joi.object({
        fullName: Joi.string().min(3).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(8).required(),
      });
  
      const { error } = await signupSchema.validateAsync(req.body);
  
      if (error) {
        res.send(error.details[0].message);
      } else {
        const employee = new employeeModel({
          fullName: req.body.fullName,
          email: req.body.email,
          password: hashedPassword,
        });
  
        const saveEmployee = await employee.save();
        res.send("Employee Signup Completed");
      }
    } catch (error) {
      res.send(error);
    }
  };