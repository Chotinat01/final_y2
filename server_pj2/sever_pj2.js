const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2/promise');
const app = express();

const port = 8600;
app.use(bodyParser.json());
app.use(cors());

let employees = [];
let conn = null;

const initMysql = async () => {
    conn = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'webdb',
        port: 8850
    })
}

const validateData = (employeeData) => {
    let errors = []

    if (!employeeData.firstName) {
        errors.push('กรุณากรอกชื่อ')
    }
    if (!employeeData.lastName) {
        errors.push('กรุณากรอกนามสกุล')
    }
    if (!employeeData.age) {
        errors.push('กรุณากรอกอายุ')
    }
    if (!employeeData.gender) {
        errors.push('กรุณาเลือกเพศ')
    }
    if (!employeeData.action) {
        errors.push('กรุณาเลือกการกระทำ')
    }
    return errors;
}

app.get('/employees', async (req, res) => {
    const results = await conn.query('SELECT * FROM employees');
    res.json(results[0])
})

app.post('/employees', async (req, res) => {
    try{
        let employee = req.body;
        const errors = validateData(employee);
        if(errors.length > 0){
            throw {  
                message: 'กรุณากรอกข้อมูลให้ครบถ้วน', 
                errors: errors 
            }
        }
        const results = await conn.query('INSERT INTO employees SET ?', employee)
        res.json({
            message: 'Create user successfully',
            data: results[0]
        })
    }catch(error){
        const errorMessage = error.message || 'something went wrong'
        const errors = error.errors || []
        console.error('error message ', error.message)
        res.status(500).json({
            message: errorMessage,
            errors: errors
        })
    }
})

app.get('/employees/:id', async(req, res) => {
    try{
        let id = req.params.id;
        const results = await conn.query('SELECT * FROM employees WHERE id = ?', id)
        if(results[0].length  == 0){
            throw { statusCode: 404, message: 'employee not found' }
        }
        res.json(results[0][0])
    }catch(error){
        console.error('error: ', error.message)
        let statusCode = error.statusCode || 500
        res.status(500).json({
            message: 'something went wrong',
            errorMessage: error.message
        })
    }
})

app.put('/employees/:id', async(req, res) => {
    try{
        let id = req.params.id;
        let updateEmployee = req.body;
        const results = await conn.query(
            'UPDATE employees SET ? WHERE id = ?  ', 
            [updateEmployee, id])
        res.json({
            message: 'Update successfully',
            data: results[0]
        })
    }catch(error){
        console.error('error: ', error.message)
        res.status(500).json({
            message: 'something went wrong',
            errorMessage: error.message
        })
    }
})

app.delete('/employees/:id', async(req, res) => {
    try{
        let id = req.params.id;
        const results = await conn.query('DELETE from employees WHERE id = ?  ', parseInt(id))
        res.json({
            message: 'Delete user successfully',
            data: results[0]
        })
    }catch(error){
        console.error('error: ', error.message)
        res.status(500).json({
            message: 'something went wrong',
            errorMessage: error.message
        })
    }
})

app.listen(port, async (req, res) => {
    try {
        await initMysql(); // เชื่อมต่อกับ MySQL
        console.log('Server is running on port ' + port);
    } catch (error) {
        console.error('Error during MySQL connection:', error.message);
    }
});