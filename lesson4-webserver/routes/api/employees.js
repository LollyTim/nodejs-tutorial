const express = require('express');
const router = express.Router();
const path = require('path');
const employeesCOntroller = require('../../controllers/employeesController')
const verifyJWT = require('../../middleware/verifyJWT')
router.route('/')
   .get(employeesCOntroller.getAllEmployees)
   .post(employeesCOntroller.createNewEmployee)
   .put(employeesCOntroller.updateEmployee)
   .delete(employeesCOntroller.deleteEmployee)

router.route('/:id')
    .get(employeesCOntroller.getEmployee)

module.exports = router;

