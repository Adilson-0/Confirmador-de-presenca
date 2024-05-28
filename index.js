//função principal da aplicação (utiliza a função email e lista)
const express = require("express");
const app = express();
app.use(express.static("view"));
app.use(express.json());
var alunoJson;

app.post('/addAluno', function (req, res) {
    alunoJson = req.body;
    res.status(201).end();
});

app.listen("8080", ()=>{
    console.log("server on");
});
