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
};

