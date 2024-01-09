const data = {};
data.employees = require('./data/employees.json')

const getAllEmployees = (req, res) => {
       res.json(data.employees);
   }

const createNewEmployee = (req, res) => {
       res.json({
        "firstname": req.body.firstname,
        "lastname": req.body.lastname
       });
   }
const updateEmployee = (req, res) => {
       res.json({
        "firstname": req.body.firstname,
        "lastname": req.body.lastname
       })
   }
   
const deleteEmployee = (req, res) => {
       res.json({
        "id": req.body.id
       })
   }