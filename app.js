const express = require('express');
const mysql = require('mysql2');
const parser = require('body-parser');
const config = require('./config');
//const empRoutes = require('./Routes/routes');
const app = express();
const port = 4000;

//app.use('/',empRoutes);
app.use(express.urlencoded({extended:true}));
app.use(express.json());

const connection = mysql.createConnection(config);

connection.connect((err)=>{
    if(err) throw err;
    console.log("Connected to The Database");
});

// app.get('/',(req,res)=>{
//     connection.query('select * from employees',(error,result,fields)=>{
//         if(error) {
//             console.log(error.message);
//         }
//         res.json(result);
        
//     });
// });
app.get('/',(req,res)=>{
    connection.query('select * from employees',(error,result,fields)=>{
        if(error) {
            console.log(error.message);
        }
        res.json(result);
    });
});

app.get('/:id',(req,res)=>{
  connection.query(`select * from employees where id = ${req.params.id}`,(error,result,fields)=>{
    if(error) throw error;
    res.json(result[0]);
  });
});

app.post('/employee', (req, res) => {
    const {id, name, company, address } = req.body;
    connection.query('INSERT INTO employees (id,name, company, address) VALUES (?,?, ?, ?)', [id,name, company, address], (err, result) => {
      if (err) {
        throw err;
      }
      res.send({ id, name, company, address });
    });
  });
  

  app.put('/:id', (req, res) => {
    const { name, company, address } = req.body;
    connection.query('UPDATE employees SET  name = ?, company = ?,address = ? WHERE id = ?', [name, company, address, req.params.id], (err, result) => {
      if (err) {
        throw err;
      }
      res.send({ id: req.params.id, name, company, address });
    });
  });
  

  app.delete('/:id', (req, res) => {
    connection.query('DELETE FROM employees WHERE id = ?', [req.params.id], (err, result) => {
      if (err) {
        throw err;
      }
      res.send(`Item with ID ${req.params.id} deleted.`);
    });
  });
  
  
  
  
  

app.listen(port,()=>{
    console.log(`Server Running On port ${port}`);
});
