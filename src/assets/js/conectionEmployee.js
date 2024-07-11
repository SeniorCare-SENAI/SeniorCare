let cadastrarFuncionario = document.getElementById('cadastrarFuncionario')
let buscarFuncionario = document.getElementById('buscarFuncionario')
let apagarFuncionario = document.getElementById('apagarFuncionario')
let listarFun = document.getElementById('listarFun')

let resposta = document.getElementById('resposta')
let resproc = document.getElementById('resproc')
let resapaga = document.getElementById('resapaga')
let res = document.getElementById('res')

cadastrarFuncionario.addEventListener('click', ()=>{
    const nomeFunc = document.getElementById('nomeFunc').value
    const cpf = document.getElementById('cpf').value
    const telefone = document.getElementById('telefone').value
    const cargo = document.getElementById('cargo').value
    const situacao = document.getElementById('situacao').value


    const dados = {
        nomeFuncionario: nomeFunc,
        cpfFuncionario: cpf,
        telefoneFuncionario: telefone,
        cargoFuncionario: cargo,
        situacaoFuncionario: situacao
    }

    console.log(dados)
    
    if((nomeFunc == '')||(cpf == '')||(telefone == '')||(cargo == '')){
        resposta.innerHTML = `você não pode deixar de colocar as informações Nome Funcionário, CPF, Telefone ou cargo`
    }else{
        fetch('http://localhost:8080/funcionario',{
            method : "POST",
            headers : {"Content-Type":"application/json"},
            body: JSON.stringify(dados)
        })
        .then(resultado => resultado.json())
        .then(valores => {
            console.log(valores)
            resposta.innerHTML = "Codigo Funcionario: "+ valores.codFuncionario + "<br>"
            resposta.innerHTML += "nome Funcionario: "+ valores.nomeFuncionario + "<br>"
            resposta.innerHTML += "cargo Funcionario: "+ valores.cargoFuncionario + "<br>"
            resposta.innerHTML += "cpf Funcionario: "+ valores.cpfFuncionario + "<br>"
            resposta.innerHTML += "situacao Funcionario: "+ valores.situacaoFuncionario + "<br>"
            resposta.innerHTML += "telefone Funcionario: "+ valores.telefoneFuncionario 
        })
        .catch((err)=>{
            console.error("Erro de conexão",err)
        })
    }    
})


buscarFuncionario.addEventListener('click', ()=>{
    let codFunc = Number(document.getElementById('codFunc').value)
    
    const dados = {
        codFuncionario: codFunc
    }
    
    fetch(`http://localhost:8080/funcionario/${codFunc}`)
    .then(resposta => resposta.json(dados))
    .then(valores => {
        resproc.innerHTML = "Código: " + valores.codFuncionario + "<br>" 
        + "Nome: " + valores.nomeFuncionario + "<br>" 
        + "Cargo: " + valores.cargoFuncionario  + "<br>" 
        + "CPF: " + valores.cpfFuncionario + "<br>" 
        + "Situacao: " + valores.situacaoFuncionario + "<br>"
        + "Telefone: " + valores.telefoneFuncionario 
    })
    .catch((err) => console.error("Falha ao tentar encontrar funcionário!", err))
});

apagarFuncionario.addEventListener('click', ()=>{
    let escolha = confirm('Tem certeza que desejá apagar?')
    
    if(escolha) {
        let codFuncA = Number(document.getElementById('codFuncA').value)
        console.log(codFuncA)
        
        fetch(`http://localhost:8080/funcionario/${codFuncA}`,{
            method: "DELETE",
            headers: {"Content-Type":"application/json"}
        })
            .then(resposta => resposta.text())
            .then(dados => {
            resapaga.innerHTML = "Funcionario apagado com sucesso!"
        })
        .catch((err) => console.error("Erro ao apagar o funcionario!", err))
    }else {
        alert('Digite o código corretamente')
    }
    
});

listarFun.addEventListener('click', ()=>{
    fetch('http://localhost:8080/funcionario')
    .then(resposta => resposta.json())
    .then(dados => {
        console.log(dados)
        res.innerHTML = `<table>
        </table>` 

        res.innerHTML = ""
        dados.forEach(dad => {
            res.innerHTML += `<tr> <td> ${dad.codFuncionario} </td> <td> ${dad.nomeFuncionario} </td> <td> ${dad.cargoFuncionario} </td> <td> ${dad.cpfFuncionario} </td> <td> ${dad.situacaoFuncionario} </td> <td> ${dad.telefoneFuncionario} </td> </tr>`

        })
    })
    .catch((err) => console.error("Falha ao listar todos os funcionários", err))
});