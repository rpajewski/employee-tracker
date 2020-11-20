const db = require('./db/index.js');
const { prompt } = require('inquirer');

require('console.table');

function init() {
    console.log('Welcome to Employee Tracker!\n');
    mainPrompts();
};

function mainPrompts() {
    prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'Begin by choosing one of the options.',
            choices: [
                {
                    name: 'View all employees',
                    value: 'ALL_EMPLOYEES'
                },
                {
                    name: 'View all employees by department',
                    value: 'VIEW_EMPLOYEES_BY_DEPARTMENT'
                },
                {
                    name: 'View all employees by manager',
                    value: 'VIEW_EMPLOYEES_BY_MANAGER'
                },
                {
                    name: 'Add an employee',
                    value: 'ADD_EMPLOYEE'
                },
                {
                    name: 'Remove an employee',
                    value: 'REMOVE_EMPLOYEE'
                },
                {
                    name: 'Update an employee role',
                    value: 'UPDATE_EMPLOYEE_ROLE'
                },
                {
                    name: 'Update an employee manager',
                    value: 'UPDATE_EMPLOYEE_MANAGER'
                },
                {
                    name: 'View all roles',
                    value: 'ALL_ROLES'
                },
                {
                    name: 'Add a role',
                    value: 'ADD_ROLE'
                },
                {
                    name: 'Remove a role',
                    value: 'REMOVE_ROLE'
                },
                {
                    name: 'View all departments',
                    value: 'ALL_DEPARTMENTS'
                },
                {
                    name: 'Add a department',
                    value: 'ADD_DEPARTMENT'
                },
                {
                    name: 'Remove a department',
                    value: 'REMOVE_DEPARTMENT'
                },
                {
                    name: 'View salary budget by department',
                    value: 'VIEW_SALARY_BUDGET_BY_DEPARTMENT'
                },
                {
                    name: 'Leave',
                    value: 'LEAVE'
                }
            ]
        }
    ]).then(res => {
        let choice = res.choice;
        console.log('\n');
        console.log(choice);

        switch (choice) {
            case 'ALL_EMPLOYEES':
                allEmployees();
                break;
            case 'VIEW_EMPLOYEES_BY_DEPARTMENT':
                employeesByDepartment();
                break;
            case 'VIEW_EMPLOYEES_BY_MANAGER':
                employeesByManager();
                break;
            case 'ADD_EMPLOYEE':
                addEmployee();
                break;
            case 'REMOVE_EMPLOYEE':
                removeEmployee();
                break;
            case 'UPDATE_EMPLOYEE_ROLE':
                updateEmployeeRole();
                break;
            case 'UPDATE_EMPLOYEE_MANAGER':
                updateEmployeeManager();
                break;
            case 'ALL_ROLES':
                allRoles();
                break;
            case 'ADD_ROLE':
                addRole();
                break;
            case 'REMOVE_ROLE':
                removeRole();
                break;
            case 'ALL_DEPARTMENTS':
                allDepartments();
                break;
            case 'ADD_DEPARTMENT':
                addDepartment();
                break;
            case 'REMOVE_DEPARTMENT':
                removeDepartment();
                break;
            case 'VIEW_SALARY_BUDGET_BY_DEPARTMENT':
                viewSalaryBudgetByDepartment();
                break;
            default:
                quit();
        }
    })
};

function allEmployees() {
    db.viewAllEmployees()
    .then(([rows]) => {
        let employees = rows;
        console.log('===================================================================================');
        console.table(employees);
    })
    .then(() => mainPrompts());
};

function employeesByDepartment() {
    db.findEmployeesByDepartment()
    .then(([rows]) => {
        let departmentEmployees = rows;
        console.table(departmentEmployees);
    })
    .then(() => mainPrompts());
};

function employeesByManager() {
    db.findEmployeesByManager()
    .then(([rows]) => {
        let managedEmployees = rows;
        console.table(managedEmployees);
    })
    .then(() => mainPrompts());
};

function addEmployee() {

};

function removeEmployee() {

};

function updateEmployeeRole() {

};

function updateEmployeeManager() {

};

function allRoles() {

};

function addRole() {

};

function removeRole() {

};

function allDepartments() {

};

function addDepartment() {

};

function removeDepartment() {

};

function viewSalaryBudgetByDepartment() {

};

function quit() {

};

init();