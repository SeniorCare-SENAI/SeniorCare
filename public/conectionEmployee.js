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
})

listar.addEventListener('click', ()=>{
    fetch('http://localhost:8080/funcionario')
    .then(resposta => resposta.json())
    .then(dados => {
        resList.innerHTML = "";
        dados.forEach(dado => {
            res.innerHTML += "Código: " + dado.codFuncionario + "<br>" 
            + "Nome: " + dado.nomeFuncionario + "<br>" 
            + "Cargo: " + dado.cargoFuncionario + "<br>" 
            + "CPF: " + dado.cpfFuncionario  +  "<br>"  
            + "Situacao: " + dado.situacaoFuncionario + "<br>" 
            + "Telefone: " + dado.telefoneFuncionario 
        })
    })
    .catch((err) => console.error("Falha ao listar todos os produtos", err))
});

buscarFuncionario.addEventListener('click', ()=>{
    let codFunc = Number(document.getElementById('codFunc').value)

    fetch(`http://localhost:8080/produto/${codFunc}`)
    .then(resposta => resposta.json())
    .then(dados => {
        res.innerHTML = "Código: " + dados.codFuncionario + "<br>" 
        + "Nome: " + dados.nomeFuncionario + "<br>" 
        + "Cargo: " + dados.cargoFuncionario  + "<br>" 
        + "CPF: " + dados.cpfFuncionario + "<br>" 
        + "Situacao: " + dados.situacaoFuncionario + "<br>"
        + "Telefone: " + dados.telefoneFuncionario 
    })
    .catch((err) => console.error("Falha ao tentar encontrar produto!", err))
});

deletar.addEventListener('click', ()=>{
    let codProduto = Number(document.getElementById('codProduto').value)

    fetch(`http://localhost:8080/produto/${codProduto}`,{
        method: "DELETE",
        headers: {"Content-Type":"application/json"}
    })
    .then(resposta => resposta.text())
    .then(dados => {
        res.innerHTML = "produto apagado com sucesso!"
    })
    .catch((err) => console.error("Erro ao apagar o produto!", err))
});
function escolha() {
    let escolha = confirm('Tem certeza que desejá apagar?')

    if(escolha) {
        
    }
}