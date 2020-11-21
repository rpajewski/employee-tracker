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
        console.log('All Employees Table');
        console.log('===================================================================================');
        console.table(employees);
    })
    .then(() => mainPrompts());
};

function employeesByDepartment() {
    db.viewAllDepartments()
    .then(([rows]) => {
        let departments = rows;
        const departmentChoices = departments.map(({ id, name }) => ({
            name: name,
            value: id
        }));

        prompt([
            {
                type: 'list',
                name: 'departmentId',
                message: 'Which department would you like to retrieve employees from?',
                choices: departmentChoices
            }
        ])
        .then(res => db.findDepartmentbyId(res.departmentId))
        .then(([row]) => {
            let departmentTitle = row[0].name;
            let departmentId = row[0].id;

            db.findEmployeesByDepartment(departmentId)
            .then(([rows]) => {
                let departmentEmployees = rows;
                console.log(`\nEmployees From ${departmentTitle}`);
                console.log('============================================')
                console.table(departmentEmployees);
            })
            .then(() => mainPrompts());
        })
    })
};

function employeesByManager() {

};

function addEmployee() {
    prompt([
        {
            name: 'firstName',
            message: 'What is the employees first name?'
        },
        {
            name: 'lastName',
            message: 'What is the employees last name?'
        }
    ])
    .then(res => {
        let firstName = res.firstName;
        let lastName = res.lastName;

        db.viewAllRoles()
        .then(([rows]) => {
            let roles = rows;
            const roleChoices = roles.map(({ id, title }) => ({
                name: title,
                value: id
            }));

            prompt([
                {
                    type: 'list',
                    name: 'roleId',
                    message: 'What is the employees role?',
                    choices: roleChoices
                }
            ])
            .then(res => {
                let roleId = res.roleId;

                db.viewAllEmployees()
                .then(([rows]) => {
                    let employees = rows;
                    const managerChoices = employees.map(({ id, first_name, last_name }) => ({
                        name: `${first_name} ${last_name}`,
                        value: id
                    }));

                    managerChoices.push({ name: 'none', value: null });
                    
                    prompt([
                        {
                            type: 'list',
                            name: 'managerId',
                            message: 'Who is the employees manager?',
                            choices: managerChoices
                        }
                    ])
                    .then(res => {
                        let managerId = res.managerId;
                        let newEmployee = {
                            first_name: firstName,
                            last_name: lastName,
                            role_id: roleId,
                            manager_id: managerId
                        }

                        db.addNewEmployee(newEmployee);
                    })
                    .then(() => {
                        console.log(`
===============================================
Added ${firstName} ${lastName} to the database!
===============================================
`);
                    })
                    .then(() => mainPrompts());
                })
            })
        })
    })
};

function removeEmployee() {
    db.viewAllEmployees()
    .then(([rows]) => {
        let employees = rows;
        const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
            name: `${first_name} ${last_name}`,
            value: id
        }));

        prompt([
            {
                type: 'list',
                name: 'employeeId',
                message: 'Which employee would you like to remove? (Warning: this will be permanent)',
                choices: employeeChoices
            }
        ])
        .then(res => db.findEmployeeById(res.employeeId))
        .then(([row]) => {
            let firstName = row[0].first_name;
            let lastName = row[0].last_name;
            let employeeID = row[0].id;

            db.deleteEmployee(employeeID)
            .then(() => {
                console.log(`
===================================================
Removed ${firstName} ${lastName} from the database!
===================================================
`)
            })
        })
        .then(() => mainPrompts());
    })
};

function updateEmployeeRole() {

};

function updateEmployeeManager() {

};

function allRoles() {
    db.viewAllRoles()
    .then(([rows]) => {
        let roles = rows;
        console.log('All Employee Roles');
        console.log('==========================================');
        console.table(roles);
    })
    .then(() => mainPrompts());
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
    db.viewAllDepartments()
    .then(([rows]) => {
        let departments = rows;
        const departmentChoices = departments.map(({ id, name }) => ({
            name: name,
            value: id
        }));

        prompt([
            {
                type: 'list',
                name: 'departmentId',
                message: 'Which department would you like to remove? (Warning this is permanent and will delete all employees in this department!)',
                choices: departmentChoices
            }
        ])
        .then(res => db.findDepartmentbyId(res.departmentId))
        .then(([row]) => {
            let departmentTitle = row[0].name;
            let departmentId = row[0].id;

            db.deleteDepartment(departmentId)
            .then(() => {
                console.log(`
=============================================
Removed ${departmentTitle} from the database!
=============================================
                `)
            })
            .then(() => mainPrompts());
        })
    })
};

function viewSalaryBudgetByDepartment() {

};

function quit() {

};

init();