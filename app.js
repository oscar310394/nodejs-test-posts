const express = require('express');
const mysql = require('mysql');

//Create connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'ploi753',
    database: 'testdb'
});

db.connect((err) => {
    if (err) throw err;
    console.log('MySql Connected.');
});

const app = express();

//CREATE DATABASE
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE testdb';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Database created.');
    });
});

//CREATE TABLE
app.get('/createpoststable', (req, res) => {
    let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY (id))';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Posts table created.');
    });
});

//INSERT POST ONE
app.get('/addpost1', (req, res) => {
    let post = { title: 'Basketball', body: 'Today the Spurs will win.' };
    let sql = 'INSERT INTO posts SET ?';
    let query = db.query(sql, post, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Post One Added.');
    });
});

//INSERT POST TWO
app.get('/addpost2', (req, res) => {
    let post = { title: 'Soccer', body: 'Barcelona is the best team.' };
    let sql = 'INSERT INTO posts SET ?';
    let query = db.query(sql, post, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Post Two Added.');
    });
});

//SELECT POSTS
app.get('/getposts', (req, res) => {
    let sql = 'SELECT * FROM posts';
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        console.log(results);
        res.send('Posts fetched.');
    });
});

//SELECT POST
app.get('/getpost/:id', (req, res) => {
    let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Post fetched.');
    });
});


//UPDATE POST
app.get('/updatepost/:id', (req, res) => {
    let newTitle = 'Tennis';
    let newBody = 'Maria Sharapova is beatiful';
    let sql = `UPDATE posts SET title = '${newTitle}', body = '${newBody}' WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Post Updated.');
    });
});

//DELETE POST
app.get('/deletepost/:id', (req, res) => {    
    let sql = `DELETE FROM posts WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Post Deleted.');
    });
});

app.listen('3000', () => {
    console.log('Server started on port 3000');
});