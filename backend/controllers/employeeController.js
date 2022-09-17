const asyncHandler = require("express-async-handler");
const Employee = require("../models/employeeModel");

//Listar todos los empleados; no utilizada en el front;

exports.getAllEmployees = asyncHandler(async (req, res) => {
  const allEmployees = await Employee.find().populate({
    path: "user",
    select: "-password",
  });
  if (allEmployees) {
    res.status(200).json({
      data: allEmployees,
      text: "lista de empleados",
    });
  } else {
    res.status(401);
    throw new Error("Error to get employees");
  }
});

//crear empleado

exports.createEmployee = asyncHandler(async (req, res) => {
  const data = req.body;
  const newEmployee = await Employee.create({ ...data, user: req.user._id });
  if (newEmployee) {
    const newEmpl = await newEmployee.save();
    res.status(200).json({
      text: "empleado creado",
      newEmpl,
    });
  } else {
    res.status(401);
    throw new Error("Error to get employees");
  }
});

//listar empleados por id

exports.getlistById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const employee = await Employee.findById(id);
  if (!employee) {
    res.status(401);
    throw new Error("Employee not found");
  } else {
    res.status(200).json({
      employee,
      text: "Empleado encontrado",
    });
  }
});

//listar empleados de un jefe

exports.getEmployessBoss = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const employees = await Employee.find({ user: req.user._id });
  if (!employees) {
    res.status(401);
    throw new Error("Employees not found");
  } else {
    res.status(200).json({
      employees,
      text: "Empleado encontrado",
    });
  }
});

//eliminar empleado

exports.deleteEmployee = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const employee = await Employee.findById(id);
  if (!employee) {
    res.status(404).json({
      text: "Employee not found",
    });
  } else {
    await employee.deleteOne();
    res.status(200).json({
      text: "Employee delete",
    });
  }
});

//actualizar empleado

exports.updateEmployee = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const employee = await Employee.findById(id);
  if (!employee) {
    res.status(404).json({
      text: "Employee not found",
    });
  } else {
    await employee.updateOne(req.body);
    res.status(200).json({
      text: "Employee update",
    });
  }
});
