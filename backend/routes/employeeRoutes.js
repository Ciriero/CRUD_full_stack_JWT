const express = require("express");
const router = express.Router();
const {
  getAllEmployees,
  createEmployee,
  getlistById,
  getEmployessBoss,
  deleteEmployee,
  updateEmployee,
  searchEmployee,
} = require("../controllers/employeeController");
const verificarToken = require("../middleware/authMiddleware");

// router.post("/login", authUser);
// router.post("/register", registerUser);

router.get("/allemployees", getAllEmployees);
router.post("/create", verificarToken, createEmployee);
router.get("/listid/:id", verificarToken, getlistById);
router.get("/listboss", verificarToken, getEmployessBoss);
router.delete("/delete/:id", verificarToken, deleteEmployee);
router.put("/update/:id", verificarToken, updateEmployee);
router.get("/search/:name", searchEmployee);

module.exports = router;
