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

}

function addRole() {

}

function addEmployee() {

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