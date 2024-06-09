
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
 
const bcrypt = require('bcrypt'); 
var jwt = require('jsonwebtoken'); 
 
const app = express();
const port = 3001
 
app.use(express.json());
app.use(cors());
 
const con = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "database"
})
 
con.connect(function(err) {
    if(err) {
        console.log("Error in Connection");
    } else {
        console.log("Connected");
    }
})
 
app.get('/getEtudiant', (req, res) => {
    const sql = "SELECT * FROM etudiant";
    con.query(sql, (err, result) => {
        if(err) return res.json({Error: "Get etudiant error in sql"});
        return res.json({Status: "Success", Result: result})
    })
})
 
app.get('/get/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM etudiant where id = ?";
    con.query(sql, [id], (err, result) => {
        if(err) return res.json({Error: "Get etudiant error in sql"});
        return res.json({Status: "Success", Result: result})
    })
})
 
app.put("/update/:id", (req, res) => {
  const userId = req.params.id;
  const q = "UPDATE etudiant SET `name`= ?, `email`= ?, `salary`= ?, `address`= ? WHERE id = ?";
  
  const values = [
    req.body.name,
    req.body.email,
    req.body.grade,
    req.body.address,
  ];
  
  con.query(q, [...values,userId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
    //return res.json({Status: "Success"})
  });
});
 
app.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    const sql = "Delete FROM etudiant WHERE id = ?";
    con.query(sql, [id], (err, result) => {
        if(err) return res.json({Error: "delete etudiant error in sql"});
        return res.json({Status: "Success"})
    })
})
 
app.get('/adminCount', (req, res) => {
    const sql = "Select count(id) as admin from users";
    con.query(sql, (err, result) => {
        if(err) return res.json({Error: "Error in runnig query"});
        return res.json(result);
    })
})
 
app.get('/etudiantCount', (req, res) => {
    const sql = "Select count(id) as etudiant from etudiant";
    con.query(sql, (err, result) => {
        if(err) return res.json({Error: "Error in runnig query"});
        return res.json(result);
    })
})
 
app.get('/grade', (req, res) => {
    const sql = "Select sum(grade) as sumOfGrade from etudiant";
    con.query(sql, (err, result) => {
        if(err) return res.json({Error: "Error in runnig query"});
        return res.json(result);
    })
})
 
app.post('/create', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const address = req.body.address;
    const grade = req.body.grade;
  
    con.query("INSERT INTO etudiant (name, email, address, grade) VALUES (?, ?, ?, ?)", [name, email, address, grade], 
        (err, result) => {
            if(result){
                res.send(result);
            }else{
                res.send({message: "ENTER CORRECT DETAILS!"})
            }
        }
    )
})
 
app.get('/hash', (req, res) => { 
    bcrypt.hash("123456", 10, (err, hash) => {
        if(err) return res.json({Error: "Error in hashing password"});
        const values = [
            hash
        ]
        return res.json({result: hash});
    } )
})
 
app.post('/login', (req, res) => {
    const sql = "SELECT * FROM users Where email = ?";
    con.query(sql, [req.body.email], (err, result) => {
        if(err) return res.json({Status: "Error", Error: "Error in runnig query"});
        if(result.length > 0) {
            bcrypt.compare(req.body.password.toString(), result[0].password, (err, response)=> {
                if(err) return res.json({Error: "password error"});
                if(response) {
                    const token = jwt.sign({role: "admin"}, "jwt-secret-key", {expiresIn: '1d'});
                    return res.json({Status: "Success", Token: token})
                } else {
                    return res.json({Status: "Error", Error: "Wrong Email or Password"});
                }
            })
        } else {
            return res.json({Status: "Error", Error: "Wrong Email or Password"});
        }
    })
})
 
app.post('/register',(req, res) => {
    const sql = "INSERT INTO users (`name`,`email`,`password`) VALUES (?)"; 
    bcrypt.hash(req.body.password.toString(), 10, (err, hash) => {
        if(err) return res.json({Error: "Error in hashing password"});
        const values = [
            req.body.name,
            req.body.email,
            hash,
        ]
        con.query(sql, [values], (err, result) => {
            if(err) return res.json({Error: "Error query"});
            return res.json({Status: "Success"});
        })
    } )
})
 
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})