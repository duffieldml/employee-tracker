const mysql = require('mysql');
const inquirer = require('inquirer');
const { up } = require('inquirer/lib/utils/readline');

const connection = mysql.createConnection({
  host: 'localhost',

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: 'root',

  // Be sure to update with your own MySQL password!
  password: process.env.mysqlpassword,
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

            case 'Update Employee Roles':
            updatedRole();
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
        'SELECT employee.first_name, employee.last_name, employee_role.id, employee_role.title, employee_role.salary, department.name FROM ';
    query +=
        'employee LEFT JOIN employee_role ON (employee.id = employee_role.id) ';
    query +=
        'LEFT JOIN department ON (employee_role.department_id = department.id)';
    connection.query(query, (err, res) => {
      res.forEach(({ first_name, last_name, id, title, salary, name }) => {
        console.log(
          `Name: ${first_name} ${last_name} || ID: ${id} || Title: ${title} || Salary: ${salary} || Department: ${name} \n`
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
        console.log('New department has been succesfully added! \n');
        departmentsSearch();
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
        rolesSearch();
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

// UPDATE `trackerdb`.`employee` SET `last_name` = '' WHERE (`id` = '2');

// const updateRoles = () => {
//     connection.query('SELECT * FROM employee_role', (err, res) => {
//         if (err) throw err;
//     inquirer.prompt([{
//         name: 'choice',
//         type: 'list',
//         choices() {
//             const array = [];
//             res.forEach(({ id }) => {
//                 array.push(id)
//             });
//             return array
//         },
//         message: 'What employee would you like to update?',
//       },
//       {
//         name: 'role',
//         type: 'input',
//         message: 'What will be the their new title?',   
//       }
//     ])
//       .then((answers) => {
//         const update = () => {
//             console.log(answers);
//             console.log(`Updating ${answers.choice} role.\n`);
//             const query = connection.query(
//                 'UPDATE employee_role SET ? where ?',
//                     {
//                         id: answers.choice,
//                     }, 
//                     {
//                         title: answers.role,
//                     }, 
//                 (err, res) => {
//                     if (err) throw err;
//                     console.log(`Role has been successfully updated for ${answers.choice}!`);
//                     rolesSearch();
//                 });
//             };
//       });
//     })
// }

const updatedRole = () => {
    inquirer
    .prompt([{
      name: 'id',
      type: 'input',
      message: 'What is the ID of employee you wish to update?',
    },
    {
      name: 'title',
      type: 'input',
      message: 'What is their new title?',   
    },
    ])
    .then((answers) => {
    console.log(answers);
    const query = connection.query(
        'UPDATE employee_role SET ? where ?',
        [
            {
                title: answers.title,
            },
            {
                id: answers.id,
            },
        ], 
        (err, res) => {
            console.log(answers);
            console.log(query.sql);
            console.log('You have successfully updated their title');
            rolesSearch();
        });
    });
};
