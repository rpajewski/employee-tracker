const connection = require('./connection');

class Database {
    // establish connection to server and database
    constructor(connection) {
        this.connection = connection;
    }
    // find all employees
    viewAllEmployees() {
        console.log('\n')
        return this.connection.promise().query(
            `SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name AS department, roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
            FROM employees
            LEFT JOIN roles ON employees.role_id = roles.id
            LEFT JOIN departments ON roles.department_id = departments.id
            LEFT JOIN employees manager ON manager.id = employees.manager_id;`
        )
    };

    // find employees by department

};

module.exports = new Database(connection);