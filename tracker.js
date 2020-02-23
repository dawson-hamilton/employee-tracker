const mysql = require("mysql");
const Table = require('cli-table3');
const inquirer = require("inquirer");


const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.MYSQL_PASSWORD,
    database: "employee_tracker_db"
});
connection.connect(function (err) {
    if (err) throw err;
    console.log("-----------------------------------------------")
    console.log("-----------------------------------------------\n")
    console.log("                    Welcome                    ")
    console.log("                    to the                      ")
    console.log("                    employee                   ")
    console.log("                   management                  ")
    console.log("                    system!                   \n")
    console.log("-----------------------------------------------")
    console.log("-----------------------------------------------\n")
    runManagementQuery();
});
function runManagementQuery() {
    inquirer
        .prompt({
            name: "action",
            type: "rawlist",
            message: "What would you like to do?",
            choices: [
                "Add Departments, Roles, or Employees?",
                "View Employees?",
                "Update Employee Roles",
                "exit"
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "Add Departments, Roles, or Employees?":
                    console.log("-----------------------------------------------")
                    console.log("-----------------------------------------------\n")
                    console.log("Adding departments, roles, or employees\n");
                    console.log("-----------------------------------------------")
                    console.log("-----------------------------------------------\n")
                    console.log("Follow the steps provided\n");
                    console.log("-----------------------------------------------")
                    console.log("-----------------------------------------------\n")
                    runAddQuery();
                    break;
                case "View Employees?":
                    viewSelection();
                    break;
                case "Update Employee Roles":
                    console.log("time to make the update function");
                    updateRole();
                    break;
                case "exit":
                    console.log("--------------------------------------------------------------------------")
                    console.log("|-We hope you have enjoyed your time with the employee management system-|")
                    console.log("--------------------------------------------------------------------------")
                    connection.end();
                    break;
            }
        })
};
function runAddQuery() {
    inquirer
        .prompt({
            name: "action",
            type: "rawlist",
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
                    console.log("--------------Adding a department--------------");
                    console.log("\n-----------------------------------------------\n");
                    addDepartment();
                    break;
                case "Add Role":
                    console.log("\n-----------------------------------------------\n");
                    console.log("-----------------Adding a role-----------------");
                    console.log("\n-----------------------------------------------\n");
                    addRole();
                    break;
                case "Add Employee":
                    console.log("\n-----------------------------------------------\n");
                    console.log("-------------Adding an employee----------------");
                    console.log("\n-----------------------------------------------\n");
                    addEmployee();
                    break;
                case "Go back":
                    console.log("\n-----------------------------------------------\n");
                    console.log("---------Returning you to the beginning--------");
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
                console.log("-----------------------------------------------\n")
                console.log("Department added: " + department.dep) + '\n';
                console.log("-----------------------------------------------\n")
                console.log("-----------------------------------------------\n")
                runManagementQuery();
            })
        })
};
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
};
function viewSelection() {
    inquirer
        .prompt({
            name: "selection",
            type: "rawlist",
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
                    viewDepartment();
                    break;
                case "View Employees by role":
                    console.log("viewing roles");
                    viewRole();
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
        var table = new Table({
            head: ['ID', 'Employee', 'Title', 'Salary', 'Manager']
            , style: {
                head: [],
                border: []
            }
            , colWidths: [6, 23, 23, 23]
        });
        for (var i = 0; i < res.length; i++) {
            var tableArray = [res[i].id, res[i].employee, res[i].title, res[i].salary, res[i].manager]
            table.push(tableArray)
        };
        console.log(table.toString());
        viewSelection();
    })
}
function viewDepartment() {
    inquirer
        .prompt({
            name: "dep",
            type: "rawlist",
            message: "Which department would you like to view?",
            choices: [
                "operations",
                "marketing",
                "technology",
                "administration",
                "sales",
                "finance",
                "product",
                "human resources",
                "legal"
            ]
        }).then(function (view) {
            let depQuery = "SELECT department.name, employee.id, employee.first_name, employee.last_name,role.title,role.salary FROM ((department INNER JOIN role on department.id = role.department_id) inner join employee on role.id = employee.role_id) WHERE department.name = ?"
            connection.query(depQuery, view.dep, function (err, res) {
                let table = new Table({
                    head: ['ID', 'Employee', 'Title', 'Salary']
                    , style: {
                        head: [],
                        border: []
                    }
                    , colWidths: [6, 23, 23, 23]
                });
                for (var i = 0; i < res.length; i++) {
                    var depArray = [res[i].id, res[i].first_name + " " + res[i].last_name, res[i].title, res[i].salary];
                    table.push(depArray);
                }
                console.log(table.toString());
                console.log(res.length + ' employees found!');
                viewSelection();
            })
        })
}
function viewRole() {
    inquirer
        .prompt({
            name: "role",
            type: "rawlist",
            message: "What role would would you like to review?",
            choices: [
                "ceo",
                "coo",
                "cto",
                "cmo",
                "cfo",
                "coo",
                "content_specialist",
                "director_ux",
                "executive_secretary",
                "hr_specialist",
                "outbound_sales_rep",
                "product_manager",
                "qa_director",
                "qa_specialist",
                "software_engineer",
                "sr_account_rep",
                "sr_content_writer",
                "sr_developer",
                "svp_sales",
                "ux_designer",
                "vp_product",
            ]
        })
        .then(function (roleRes) {
            let viewRoleQuery = "SELECT role.title, employee.first_name, employee.last_name, role.salary FROM role INNER JOIN employee ON employee.role_id=role.id WHERE role.title = ?";
            connection.query(viewRoleQuery, roleRes.role, function (err, res) {
                let table = new Table({
                    head: ['Title', 'Employee', 'Salary']
                    , style: {
                        head: [],
                        border: []
                    }
                    , colWidths: [23, 23, 23]
                });
                for (var i = 0; i < res.length; i++) {
                    var tableArray = [res[i].title, res[i].first_name + " " + res[i].last_name, res[i].salary]
                    table.push(tableArray);
                }
                console.log(table.toString());
                viewSelection();
            });
        });
};
function updateRole() {
    var getNameQuery = "SELECT CONCAT(first_name,' ',last_name) fullname FROM employee";
    var getRoleQuery = "SELECT id,title FROM role"
    var updateNameQuery = "UPDATE employee SET role_id= ?  WHERE CONCAT(first_name,' ',last_name)= ?";
    var employeeArray = [];
    var roleArray = [];
    var roleChoice;
    connection.query(getRoleQuery, function (err, res) {
        for (let i = 0; i < res.length; i++) {
            roleArray.push(res[i].title)
        }
        connection.query(getNameQuery, function (err, res) {
            for (let i = 0; i < res.length; i++) {
                employeeArray.push(res[i].fullname)
            }
            inquirer
                .prompt([{

                    name: "emp",
                    type: "rawlist",
                    message: "Which employee would you like to update?",
                    choices: employeeArray
                },
                {
                    name: "rol",
                    type: "rawlist",
                    message: "What would you like to update this employees role to?",
                    choices: roleArray
                }
                ])
                .then(function (emp) {
                    console.log(emp)
                    switch (emp.rol) {
                        case 'ceo':
                            roleChoice = 1;
                            break;
                        case 'qa_specialist':
                            roleChoice = 2;
                            break;
                        case 'qa_director':
                            roleChoice = 3;
                            break;
                        case 'coo':
                            roleChoice = 4;
                            break;
                        case 'sr_content_writer':
                            roleChoice = 5;
                            break;
                        case 'content_specialist':
                            roleChoice = 6;
                            break;
                        case 'cmo':
                            roleChoice = 7;
                            break;
                        case 'software_engineer':
                            roleChoice = 8;
                            break;
                        case 'sr_developer':
                            roleChoice = 9;
                            break;
                        case 'cto':
                            roleChoice = 10;
                            break;
                        case 'executive_secretary':
                            roleChoice = 11;
                            break;
                        case 'sr_account_rep':
                            roleChoice = 12;
                            break;
                        case 'outbound_sales_rep':
                            roleChoice = 13;
                            break;
                        case 'svp_sales':
                            roleChoice = 14
                            break;
                        case 'cfo':
                            roleChoice = 15;
                            break;
                        case 'ux_designer':
                            roleChoice = 16;
                            break;
                        case 'director_ux':
                            roleChoice = 17;
                            break;
                        case 'vp_product':
                            roleChoice = 18;
                            break;
                        case 'product_manager':
                            roleChoice = 19;
                            break;
                        case 'hr_specialist':
                            roleChoice = 20;
                            break;
                    }
                    console.log(roleChoice, emp.emp)
                    connection.query(updateNameQuery, [roleChoice, emp.emp], function (err, res) {
                        if (err) throw err;
                    })
                    runManagementQuery()
                })
        });
    })
};