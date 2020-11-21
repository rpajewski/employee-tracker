const connection = require('./connection');

class Database {
    // establish connection to server and database
    constructor(connection) {
        this.connection = connection;
    }
    // find all employees
    viewAllEmployees() {
        return this.connection.promise().query(
            `SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name AS department, roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
            FROM employees
            LEFT JOIN roles ON employees.role_id = roles.id
            LEFT JOIN departments ON roles.department_id = departments.id
            LEFT JOIN employees manager ON manager.id = employees.manager_id;`
        );
    }

    // find employees by department
    findEmployeesByDepartment(departmentId) {
        return this.connection.promise().query(
            `SELECT employees.id, employees.first_name, employees.last_name, roles.title
            FROM employees
            LEFT JOIN roles ON employees.role_id = roles.id
            LEFT JOIN departments ON roles.department_id = departments.id
            WHERE departments.id = ?;`,
            departmentId
        );
    }

    // find employees by manager
    findEmployeesByManager(managerId) {
        return this.connection.promise().query(
            `SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name AS department
            FROM employees
            LEFT JOIN roles ON employees.role_id = roles.id
            LEFT JOIN departments ON roles.department_id = departments.id
            WHERE manager_id = ?;`,
            managerId
        );
    }

    // find employee by id
    findEmployeeById(employeeId) {
        return this.connection.promise().query(
            `SELECT employees.id, employees.first_name, employees.last_name, employees.role_id, roles.title, roles.department_id, departments.name AS department
            FROM employees
            LEFT JOIN roles ON employees.role_id = roles.id
            LEFT JOIN departments ON roles.department_id = departments.id
            WHERE employees.id = ?;`,
            employeeId
        );
    }

    // add new employee
    addNewEmployee(newEmployee) {
        return this.connection.promise().query(
            `INSERT INTO employees SET ?;`,
            newEmployee
        );
    }

    // remove an employee
    deleteEmployee(employeeId) {
        return this.connection.promise().query(
            `DELETE FROM employees WHERE id = ?;`,
            employeeId
        );
    }

    // update employee role
    setEmployeeRole(roleId, employeeId) {
        return this.connection.promise().query(
            `UPDATE employees SET role_id = ? WHERE id = ?;`,
            [ roleId, employeeId ]
        );
    }

    // update employee manager


    // find managers by id
    findManagerById(managerId) {
        return this.connection.promise().query(
            `SELECT employees.id, employees.first_name, employees.last_name
            FROM employees
            WHERE employees.id = ?;`,
            managerId
        );
    }

    // view all roles
    viewAllRoles() {
        return this.connection.promise().query(
            `SELECT roles.id, roles.title, departments.name AS department, roles.salary 
            FROM roles
            LEFT JOIN departments ON roles.department_id = departments.id;`
        );
    }

    // find role by id
    findRolebyId(roleId) {
        return this.connection.promise().query(
            `SELECT roles.id, roles.title
            FROM roles
            WHERE roles.id = ?;`,
            roleId
        );
    }

    // add new role

    // remove role

    // view all departments
    viewAllDepartments() {
        return this.connection.promise().query(
            `SELECT departments.id, departments.name FROM departments;`
        );
    }

    // find department by id
    findDepartmentbyId(departmentId) {
        return this.connection.promise().query(
            `SELECT departments.id, departments.name
            FROM departments
            WHERE departments.id = ?;`,
            departmentId
        );
    }

    // add new department

    // remove department
    deleteDepartment(departmentId) {
        return this.connection.promise().query(
            `DELETE FROM departments WHERE id = ?;`,
            departmentId
        );
    }

    // view salary budget by department
};

module.exports = new Database(connection);