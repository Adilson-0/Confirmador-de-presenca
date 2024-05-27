//função geradora da lista de presença
const fs = require("fs");

var lista = function (nome, matricula, email, turma, ){
    fs.readFile("lista.json", (err, data)=>{
        if(err) console.log("erro ao carregar documento!");

        let listaJson = JSON.parse(data);
        listaJson.push({"nome":nome, "matricula":matricula, "email":email, "turma":turma});
        let jsonStr = JSON.stringify(listaJson);

        fs.writeFile("lista.json", jsonStr, (err) => {
            if(err) console.log("erro ao carregar documento!");
        });
    });
    console.log("aluno adicionado!");
};

module.exports = lista;