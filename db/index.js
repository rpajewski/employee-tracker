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
            LEFT JOIN departments ON role.department_id = departments.id
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

    // add new employee
    addNewEmployee(newEmployee) {
        return this.connection.promise().query(
            `INSERT INTO employees SET ?;`,
            newEmployee
        );
    }
};

module.exports = new Database(connection);