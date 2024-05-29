const dateObj = new Date()

var validacaoEmail = function(strEmail){
    /*Checa se o email do usuario é valido. só será aceito email academico
    
    strEmail: String, contem o email do usuario
    */

    strEmail.trim()

    //checa se o email é um email academico
    if (strEmail.endsWith("@academico.ifpb.edu.br")){
        return (true)
    } else {
        return (false)
    }

}



var validacaoMatriculaECurso = function(strMatricula, strCurso){
    /*Checa se a matricula do usuario é valida. a matricula é um número com 12 digitos onde os 4 primeiros indicam
    o ano da matricula, o 5º indica o periodo, o 6º,7º e 8º indicam o curso(só será aceito se for igual a strCurso)
    e os 4 ultimos digitos indicam a ordem da chamada
    
    strMatricula: String, contem a matricula do usuário

    strCurso: String, contem o curso do usuário
    */
    strMatricula.trim()

    // função pra checar se o numero está entre outros dois numeros inclusos
    let estaEntre = function (num,start,end){
        return (num >= start && num <= end)
    }


    //checa se o tamanho da matricula é 12
    if (!strMatricula.length === 12){
        return false
    }
    
    let dataMatricula = parseInt(strMatricula.slice(0,4))
    //checa se a data da matricula é valida
    if (!estaEntre(dataMatricula,1900,new dateObj.getFullYear())) {
        return false
    }

    let periodoMatricula = parseInt(strMatricula[4])
    //checa se o periodo da matricula é valido
    if (!estaEntre(periodoMatricula,1,2)){
        return false
    }

    let cursoMatricula = strMatricula.slice(5,9)
    //checa se o cursoMatricula é igual a strCurso
    if (!cursoMatricula === strCurso) {
        return false
    }

    return true
}

var validacao = function (strMatricula,strCurso,strEmail) {
    /*Checa se os parametro são validos
    
    strMatricula: String, contem a matricula do usuário
    
    strCurso: String, contem o curso do usuário
    
    strEmail: String, contem o email do usuário*/

    return (validacaoMatriculaECurso(strMatricula,strCurso) && validacaoEmail(strEmail))
}

module.exports = validacao;