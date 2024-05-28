const nomeInp = document.getElementById("nome");
const matriculaInp = document.getElementById("matricula");
const emailInp = document.getElementById("email");
const turmaInp = document.getElementById("turma");
const button = document.getElementById("submit");

button.addEventListener("click", ()=>{
    var dados = {
        nome:nomeInp.value,
        matricula:matriculaInp.value,
        email:emailInp.value,
        turma:turmaInp.value
    }
    alunoReq(dados);
});

async function alunoReq(dados){
    try{
        let req = await fetch("http://localhost:8080/addAluno", 
        {
            method:'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(dados)
        });

        let resp = await req;
        console.log(resp);
    }catch (err){
        console.log(err);
    }
}