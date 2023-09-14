const mysql = require('mysql2');
const inquier = require('inquirer');
const config = require('./package.json');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'employees_db',
});

const inQquestions = [
  {
    type: 'list',
    name: 'action',
    message: 'What would you like to do?',
    choices: [
      'View All Employees',
      'View All Roles',
      'View All Departments',
      'Add Employee',
      'Add Role',
      'Add Department',
      'Update Role for Employee',
      'QUIT',
    ],
  },
];

function startPrompt() {
  inquier
    .prompt(inQquestions)
}

function viewEmployees() {
  connection.query('SELECT * FROM employee', function (error, data) {
    console.table(data);
    startPrompt();
  });
}

function viewRoles() {
  connection.query('SELECT * FROM role', function (error, data) {
    console.table(data);
    startPrompt();
  });
}

function viewDepartments() {
  connection.query('SELECT * FROM Department', function (error, data) {
    console.table(data);
    startPrompt();
  });
}

function addEmployee() {
  connection.query('SELECT * FROM role', function (error, roles) {
    inquier
      .prompt([
        {
          type: 'input',
          name: 'first_name',
          message: "what is the employee's first name?",
        },
        {
          type: 'input',
          name: 'last_name',
          message: "what is the employee's last name?",
        },
        {
          type: 'list',
          name: 'role_id',
          choices: roles.map((role) => role.title),
          message: "what is the employee's role?",
          filter: function (choice) {
            return roles.find((role) => role.title === choice).id;
          },
        },
        {
          type: 'input',
          name: 'manager_id',
          message: "who is the employee's manager? (enter manager ID or NONE)",
          filter: function (choice) {
            if (choice.toUpperCase() === 'NONE') {
              return null;
            } else return choice;
          },
        },
      ])
      .then(function (res) {
        const employee = {
          manager_id: res.manager_id,
          first_name: res.first_name,
          last_name: res.last_name,
          role_id: res.role_id,
        };
        connection.query(
          'INSERT into employee SET ?',
          employee,
          function (error, data) {
            console.table(data);
            startPrompt();
          }
        );
      });
  });
}