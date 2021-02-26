const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
  host: 'localhost',

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: 'root',

  // Be sure to update with your own MySQL password!
  password: 'Karnivor001#',
  database: 'trackerDB',
});

connection.connect((err) => {
    if (err) throw err;
    runSearch();
  });

const runSearch = () => {
    inquirer
        .prompt({
            name: 'action',
            type: 'rawlist',
            message: 'What would you like to do?',
            choices: [
                'View Employees',
                'View Roles',
                'View Departments',
                'Add Employees',
                'Add Roles',
                'Add Deparments',
                'Update Employee Roles'
            ],
        })
        .then((answer) => {
        switch (answer.action) {
            case 'View Employees':
            employeeSearch();
            break;

            case 'View Roles':
            rolesSearch();
            break;

            case 'View Departments':
            departmentsSearch();
            break;

            case 'Add Employees':
            addEmployees();
            break;

            case 'Add Roles':
            addRoles();
            break;

            case 'Add Deparments':
            addDeparments();
            break;

            case 'Update Employee Rolesnode':
            updateRoles();
            break;

            default:
            console.log(`Invalid action: ${answer.action}`);
            break;
        }
    });
};

const employeeSearch = () => {
        const query = 'SELECT * FROM employee';
        connection.query(query, (err, res) => {
          res.forEach(({ id, first_name, last_name, role_id, manager_id }) => {
            console.log(
              `ID: ${id} || Name: ${first_name} ${last_name} || Role ID: ${role_id} || Manager ID: ${manager_id}`
            );
          });
        });
        connection.end();
};

const rolesSearch = () => {
    const query = 'SELECT * FROM employee_role';
    connection.query(query, (err, res) => {
      res.forEach(({ id, title, salary, department_id }) => {
        console.log(
          `ID: ${id} || title: ${title} || Salary: ${salary} || Department: ${department_id}`
        );
      });
    });
    connection.end();
};

const departmentsSearch = () => {
    const query = 'SELECT * FROM department';
    connection.query(query, (err, res) => {
      res.forEach(({ id, name }) => {
        console.log(
          `ID: ${id} || Department: ${name}`
        );
      });
    });
    connection.end();
};