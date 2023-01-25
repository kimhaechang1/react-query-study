const express = require('express');

const bodyParser = require('body-parser');

const app = express();

const port = 4000;

var todo = [
    {
        id : "2022-12-01",
        title : "hacking"
    },
    {
        id : "2022-12-02",
        title : "react study"
    }
]

app.use(bodyParser.urlencoded({extended:true}));

app.use(bodyParser.json());

app.get("/api/todos",(req,res)=>{
    res.send(
        todo
    )
})

app.post("/api/postTodos",(req,res)=>{
    const newTodo = [...todo];
    newTodo.push(req.body);
    console.log(newTodo);
    res.send(
        newTodo
    )
})

app.listen(port, ()=>{
    console.log("서버 실행")
})