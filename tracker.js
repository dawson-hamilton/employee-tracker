const mysql = require("mysql");
const inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.MYSQL_PASSWORD
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("-----------------------------------------------\n");
    console.log("                    Welcome                    ");
    console.log("                    to the                      ");
    console.log("                    employee                   ");
    console.log("                   management                  ");
    console.log("                    system!                   \n");
    console.log("-----------------------------------------------\n");
    runManagementQuery();
})

function runManagementQuery() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "choose one of the choices below",
            choices: [
                "Add Departments, Roles, or Employees",
                "View Employees",
                "Update Employee Roles",
                "exit"
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "Add Departments, Roles, or Employees":
                    console.log("-----------------------------------------------------\n");
                    console.log("follow the instructions that follow this message\n");
                    console.log("-----------------------------------------------------\n");
                    addQuery();
                    break;

                case "View Employees":
                    viewEmployees();
                    break;

                case "Update Employee Roles":
                    updateEmployees();
                    break;

                case "exit":
                    console.log("------------------------------------------------------\n");
                    console.log("I hope you enjoyed the Employee Management System!\n");
                    console.log("------------------------------------------------------\n");
                    connection.end();
                    break;
            }
        })
}

function addQuery() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to add?",
            choices: [
                "Add Departments",
                "Add Role",
                "Add Employee",
                "Go back"
            ]
        })
        .then(function (add) {

            switch (add.action) {
                case "Add Departments":
                    console.log("\n-----------------------------------------------\n");
                    console.log("              Adding a department              ");
                    console.log("\n-----------------------------------------------\n");
                    addDepartment();
                    break;
                case "Add Role":
                    console.log("\n-----------------------------------------------\n");
                    console.log("                 Adding a role                 ");
                    console.log("\n-----------------------------------------------\n");
                    addRole();
                    break;
                case "Add Employee":
                    console.log("\n-----------------------------------------------\n");
                    console.log("             Adding an employee                ");
                    console.log("\n-----------------------------------------------\n");
                    addEmployee();
                    break;
                case "Go back":
                    console.log("\n-----------------------------------------------\n");
                    console.log("         Returning you to the beginning        ");
                    console.log("\n-----------------------------------------------\n");
                    runManagementQuery();
                    break;
            }


        })
}

function addDepartment() {
    inquirer
        .prompt({
            name: "dep",
            type: "input",
            message: "What is the name of the department you would like to add?"
        })
        .then(function (department) {

            let query = "INSERT INTO department (name) VALUES (?)";
            let addDep = department.dep;

            connection.query(query, addDep, function (err, result) {
                if (err) throw err;
                console.log("\n-----------------------------------------------\n")
                console.log("Department added: " + department.dep) + '\n';
                console.log("-----------------------------------------------\n")
                runManagementQuery();
            })
        })
}

function addRole() {
    inquirer
        .prompt([{
            name: "role",
            type: "input",
            message: "What role would you like to add?"
        },
        {
            name: "salary",
            type: "input",
            message: "What is the salary for this role?"
        },
        {
            name: "dep",
            type: "rawlist",
            message: "Which department will this role belong to?",
            choices: [
                "operations",
                "marketing",
                "technology",
                "administration",
                "sales",
                "finance",
                "product",
                "human resources"
            ]
        }
        ]).then(function (role) {

            let roleQuery = "INSERT INTO role (title, salary, department_id) VALUES(?)";
            let title = role.role;
            let salary = role.salary;
            let depId;
            switch (role.dep) {
                case "operations":
                    depId = 2;
                    break;
                case "marketing":
                    depId = 3;
                    break;
                case "technology":
                    depId = 4;
                    break;
                case "administration":
                    depId = 5;
                    break;
                case "sales":
                    depId = 6;
                    break;
                case "finance":
                    depId = 7;
                    break;
                case "product":
                    depId = 8;
                    break;
                case "human resources":
                    depId = 9;
                    break;
            }
            let rolePost = [
                title,
                salary,
                depId
            ];
            connection.query(roleQuery, [rolePost], function (err, result) {
                if (err) throw err;
                console.log("-----------------------------------------------")
                console.log("-----------------------------------------------\n")
                console.log("Role Added: " + title + " will be placed in the " + role.dep + " department.\n")
                console.log("-----------------------------------------------")
                console.log("-----------------------------------------------")
                runManagementQuery();
            });
        });
}

function addEmployee() {
    inquirer
        .prompt([
            {
                name: "firstName",
                type: "input",
                message: "Please enter the FIRST name of the new employee"
            },
            {
                name: "lastName",
                type: "input",
                message: "Please enter the LAST name of the new employee"
            },
            {
                name: "roleId",
                type: "rawlist",
                message: "What is the role of the new employee?",
                choices: [
                    "Qa specialist",
                    "Sr content writer",
                    "Content Specialist",
                    "Software engineer",
                    "Sr developer",
                    "Sr account rep",
                    "Outbound sales rep",
                    "Ux designer",
                    "Product manager"
                ]
            }, {
                name: "managerId",
                type: "rawlist",
                message: "Who is the new employees manager?",
                choices: [
                    "Ugo Ducket - QA Director",
                    "Brenelle Cubley - Sr. Developer",
                    "Brigitta Rosoni - Sr. Developer",
                    "Percy Veltman - Sr. Developer",
                    "Dante Collins - Director UX",
                    "Matteo Gobeaux - COO",
                    "Brent Grasha - CMO",
                    "Erica Romaguera - CTO",
                    "Dathyl Judd - SVP Sales",
                    "Irwin Spinello - VP Product"
                ]
            }
        ])
        .then(function (newEmployee) {

            let empQuery = 'INSERT INTO employee (first_name, last_name,role_id,manager_id) VALUES (?)'
            let empRoleId;
            let empManagerId;
            let empFirstName = newEmployee.firstName;
            let empLastName = newEmployee.lastName;
            switch (newEmployee.roleId) {
                case "Qa specialist":
                    empRoleId = 2;
                    break;
                case "Sr content writer":
                    empRoleId = 5;
                    break;
                case "Content Specialist":
                    empRoleId = 6;
                    break;
                case "Software engineer":
                    empRoleId = 8;
                    break;
                case "Sr account rep":
                    empRoleId = 12;
                    break;
                case "Outbound sales rep":
                    empRoleId = 13;
                    break;
                case "Ux designer":
                    empRoleId = 16;
                    break;
                case "Product manager":
                    empRoleId = 19;
                    break;
            }
            switch (newEmployee.managerId) {
                case "Ugo Ducket - QA Director":
                    empManagerId = 9;
                    break;
                case "Brenelle Cubley - Sr. Developer":
                    empManagerId = 10;
                    break;
                case "Brigitta Rosoni - Sr. Developer":
                    empManagerId = 11;
                    break;
                case "Percy Veltman - Sr. Developer":
                    empManagerId = 12;
                    break;
                case "Dante Collins - Director UX":
                    empManagerId = 13;
                    break;
                case "Matteo Gobeaux - COO":
                    empManagerId = 2;
                    break;
                case "Brent Grasha - CMO":
                    empManagerId = 3;
                    break;
                case "Erica Romaguera - CTO":
                    empManagerId = 4;
                    break;
                case "Dathyl Judd - SVP Sales":
                    empManagerId = 6;
                    break;
                case "Irwin Spinello - VP Product":
                    empManagerId = 8;
                    break;
            }
            var empPost = [
                empFirstName,
                empLastName,
                empRoleId,
                empManagerId
            ]
            connection.query(empQuery, ([empPost]), function (err, result) {
                if (err) throw err;
                console.log("\n-----------------------------------------------\n")
                console.log("-----------------------------------------------\n")
                console.log("Employee Added: " + empFirstName + " " + empLastName + '\n')
                console.log("-----------------------------------------------\n")
                console.log("-----------------------------------------------\n")
                runManagementQuery();
            })

        })
}

function viewEmployees() {
    inquirer
        .prompt({
            name: "selection",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View all Employees",
                "View Employees by department",
                "View Employees by role",
                "go back"
            ]
        }).then(function (view) {
            switch (view.selection) {
                case "View all Employees":
                    console.log("viewing all employees")
                    viewAll();
                    break;
                case "View Employees by department":
                    console.log("viewing department");
                    viewEmployees();
                    break;
                case "View Employees by role":
                    console.log("viewing roles");
                    viewEmployees();
                    break;
                case "go back":
                    runManagementQuery();
                    break;
            }
        })
}

function viewAll() {
    let viewAllQuery = "SELECT e.id ,CONCAT( e.first_name,' ', e.last_name) AS 'employee', role.title, role.salary, CONCAT(m.first_name,' ',m.last_name) AS 'manager' FROM ((employee e INNER JOIN role ON e.role_id=role.id) INNER JOIN employee m ON m.id=e.manager_id);"
    connection.query(viewAllQuery, function (err, res) {
        console.log(res);
        console.log("EmployeeID           Name                    Title                   Salary                  Manager")
        console.log("-----------------    --------------------    --------------------    --------------------    -------------------")
        viewEmployees();
    })
}

function viewDepartments() {
    //for viewing employees by department
}

function viewRoles() {
    //for viewing employees by roles
}

function updateEmployees() {

}