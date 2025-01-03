import express from 'express';
import { QueryResult } from 'pg';
import { pool, connectToDb } from './connection';

await connectToDb();

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// GET all employees
app.get('/api/employees', async (req, res) => {
  try {
    const { rows }: QueryResult = await pool.query('SELECT * FROM employee');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching employees' });
  }
});

// GET all roles
app.get('/api/roles', async (req, res) => {
    try {
        const { rows }: QueryResult = await pool.query('SELECT * FROM role');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching roles' });
    }
    });

// GET all departments
app.get('/api/departments', async (req, res) => {
    try {
        const { rows }: QueryResult = await pool.query('SELECT * FROM department');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching departments' });
    }
    });

// Create a new employee
app.post('/api/employees', async (req, res) => {
    const { first_name, last_name, role_id, manager_id } = req.body;
    try {
        await pool.query(
        'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)',
        [first_name, last_name, role_id, manager_id]
        );
        res.json({ message: 'Employee added' });
    } catch (error) {
        res.status(500).json({ error: 'Error adding employee' });
    }
    });

// Create a new role
app.post('/api/roles', async (req, res) => {
    const { title, salary, department_id } = req.body;
    try {
        await pool.query(
        'INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)',
        [title, salary, department_id]
        );
        res.json({ message: 'Role added' });
    } catch (error) {
        res.status(500).json({ error: 'Error adding role' });
    }
    });

// Create a new department
app.post('/api/departments', async (req, res) => {
    const { name } = req.body;
    try {
        await pool.query('INSERT INTO department (name) VALUES ($1)', [name]);
        res.json({ message: 'Department added' });
    } catch (error) {
        res.status(500).json({ error: 'Error adding department' });
    }
    });

// Update an employee by id
app.put('/api/employees/:id', async (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, role_id, manager_id } = req.body;
    try {
        await pool.query(
        'UPDATE employee SET first_name = $1, last_name = $2, role_id = $3, manager_id = $4 WHERE id = $5',
        [first_name, last_name, role_id, manager_id, id]
        );
        res.json({ message: 'Employee updated' });
    } catch (error) {
        res.status(500).json({ error: 'Error updating employee' });
    }
    });

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});