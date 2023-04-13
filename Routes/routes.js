const exp = require('express');
const router = exp.Router();
//const connection = require('../connection');


router.get('/',(req,res)=>{
    connection.query('select * from employees',(error,result,fields)=>{
        if(error) {
            console.log(error.message);
        }
        res.json(result);
    });
});

router.get('/:id',(req,res)=>{
  connection.query(`select * from employees where id = ${req.params.id}`,(error,result,fields)=>{
    if(error) throw error;
    res.json(result[0]);
  });
});

module.exports = router;