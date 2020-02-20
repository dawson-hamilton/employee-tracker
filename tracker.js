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
                "Add Departments, Roles, or Employees?",
                "View Employees?",
                "Update Employee Roles",
                "exit"
            ]
        })
}