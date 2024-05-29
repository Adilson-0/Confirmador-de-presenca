const nomeInp = document.getElementById("nome");
const matriculaInp = document.getElementById("matricula");
const emailInp = document.getElementById("email");
const turmaInp = document.getElementById("turma");
const button = document.getElementById("submit");
const codeInp = document.getElementById("code")

button.addEventListener("click", (e)=>{
    e.preventDefault()
    let dados = {
        nome:nomeInp.value,
        matricula:matriculaInp.value,
        email:emailInp.value,
        turma:turmaInp.value,
        code:codeInp.value
    }
    console.log(dados)
    alunoReq(dados);
});

async function alunoReq(dados){

    await fetch("http://localhost:8000/process", 
        {
            method:'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(dados)
        }
    )
        
    .then((resp) => {
        console.log(resp);
    })

    .catch((error) => {
        console.error(error);
    })

    
}