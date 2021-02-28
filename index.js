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
                'Update Employee Roles',
                'Exit'
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

            case 'Exit':
            console.log('Goodbye!');
            connection.end();
            break;

            default:
            console.log(`Invalid action: ${answer.action}`);
            break;
        }
    });
};

const employeeSearch = () => {
        // const query = 'SELECT * FROM employee';
        let query =
            'SELECT employee.id, employee.first_name, employee.last_name, employee_role.title, manager.name FROM '
        query +=    
            'employee LEFT JOIN employee_role ON (employee.id = employee_role.id) left join manager on (employee.manager_id = manager.id)';
        connection.query(query, (err, res) => {
          res.forEach(({ id, first_name, last_name, title, name }) => {
              if (name === null) {
                  name = 'I am the manager Karen!'
              }
            console.log(
              `ID: ${id} || Name: ${first_name} ${last_name} || Job Title: ${title} || Manager: ${name} \n`
            );
          });
          runSearch();
        });
};

const rolesSearch = () => {
    let query = 
        'SELECT employee_role.id, employee_role.title, employee_role.salary, department.name FROM ';
    query +=
        'employee_role LEFT JOIN department ON (employee_role.department_id = department.id)'; //This needs to be finished
    connection.query(query, (err, res) => {
      res.forEach(({ id, title, salary, name }) => {
        console.log(
          `ID: ${id} || title: ${title} || Salary: ${salary} || Department: ${name} \n`
        );
      });
      runSearch();
    });
};

const departmentsSearch = () => {
    const query = 'SELECT * FROM department';
    connection.query(query, (err, res) => {
      res.forEach(({ id, name }) => {
        console.log(
          `ID: ${id} || Department: ${name} \n`
        );
      });
      runSearch();
    });
};

const addDeparments = () => {
    inquirer
      .prompt([{
        name: 'id',
        type: 'input',
        message: 'What is the new ID for this department?',
      },
      {
        name: 'department',
        type: 'input',
        message: 'What department would you add?',   
      }
    ])
      .then((answers) => {
        console.log(answers);
        const query = connection.query(
            'INSERT INTO department SET ?',
            {
              id: answers.id,
              name: answers.department,
            }, (err, res) => {
        console.log(err);
        console.log('New department has been succesfully added!');
        runSearch();
        });
    });
};

const addRoles = () => {
    inquirer
      .prompt([{
        name: 'id',
        type: 'input',
        message: 'What is the new ID for this role?',
      },
      {
        name: 'title',
        type: 'input',
        message: 'What is the title of this new role?',   
      },
      {
        name: 'salary',
        type: 'input',
        message: 'What is the salary of this new role?',   
      },
      {
        name: 'department_id',
        type: 'input',
        message: 'What is the deparment ID for this new role?',   
      },
    ])
      .then((answers) => {
        console.log(answers);
        const query = connection.query(
            'INSERT INTO employee_role SET ?',
            {
              id: answers.id,
              title: answers.title,
              salary: answers.salary,
              department_id: answers.department_id,
            }, (err, res) => {
        console.log(err);
        console.log('New role has been successfully added!');
        });
    });
};

const addEmployees = () => {
    inquirer
      .prompt([{
        name: 'id',
        type: 'input',
        message: 'What is the ID of this new employee?',
      },
      {
        name: 'first',
        type: 'input',
        message: 'What is their first name?',   
      },
      {
        name: 'last',
        type: 'input',
        message: 'What is their last name?',   
      },
      {
        name: 'role_id',
        type: 'input',
        message: 'What is their role ID?',   
      },
      {
        name: 'manager_id',
        type: 'input',
        message: 'What is their manager ID?',   
      },
    ])
      .then((answers) => {
        console.log(answers);
        const query = connection.query(
            'INSERT INTO employee SET ?',
            {
              id: answers.id,
              first_name: answers.first,
              last_name: answers.last,
              role_id: answers.role_id,
              manager_id: answers.manager_id,
            }, (err, res) => {
        console.log(err);
        console.log('New employee successfully added! Now we will add in a new role for this employee.');
        addRoles();
        });
    });
};