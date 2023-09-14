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
    .then((response) => {
      if (response.action === 'View All Employees') {
        viewEmployees();
      } else if (response.action === 'View All Roles') {
        viewRoles();
      } else if (response.action === 'View All Departments') {
        viewDepartments();
      } else if (response.action === 'Add Employee') {
        addEmployee();
      } else if (response.action === 'Add Role') {
        addRole();
      } else if (response.action === 'Add Department') {
        addDepartment();
      } else if (response.action === 'Update Role for Employee') {
        updateEmployeerole();
      } else if (response.action === 'QUIT') {
        process.exit();
      }
    })
    .catch((err) => {
      console.error(err);
    });
}
startPrompt();

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

function addRole() {
  connection.query('SELECT * FROM department', function (error, departments){
inquier
  .prompt([
    {
      type: 'text',
      name: 'roleTitle',
      message: 'What is the Title of this new Role?',
    },
    {
      type: 'text',
      name: 'roleSalary',
      message: 'What is the Salary of this new Role?',
    },
    {
      type: 'list',
      name: 'roleDepartment',
      choices: departments.map((department) => department.name),
      message: 'What Department is the name of this new in?',
      filter: function (choice) {
        return departments.find((department) => department.name === choice).id;
  },
},
])  
  .then(function (res) {
    const newRole = {
      title: res.roleTitle,
      salary: res.roleSalary,
      department_id: res.roleDepartment,
    };
    connection.query(
      'INSERT into role SET ?',
      newRole,
      function (error, data) {
        console.table(data);
        startPrompt();
      });
  });
});
}

function addDepartment() {
inquier
  .prompt([
    {
      type: 'text',
      name: 'name',
      message: 'What is the name of this new department?',
    },
  ])
  .then(function (res) {
    connection.query(
      'INSERT into Department (name) values(?)',
      [res.name],
      function (error, data) {
        console.table(data);
        startPrompt();
      }
    );
  });
}

function updateEmployeerole() {
inquier
  .prompt([
    {
      type: 'text',
      name: 'empid',
      message:
        'What is the employee id of the employee would you like to update?',
    },
    {
      type: 'text',
      name: 'roleid',
      message: 'What is the new Role id?',
    },
  ])
  .then(function (res) {
    connection.query(
      'UPDATE employee SET role_id = ? WHERE id = ?',
      [res.roleid, res.empid],
      function (error, data) {
        console.table(data);
        startPrompt();
      }
    );
  });
}