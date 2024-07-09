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
buscarFuncionario.addEventListener('click',()=>{
    const codFunc = document.getElementById('codFunc').value


})

function escolha() {
    let escolha = confirm('Tem certeza que desejá apagar?')

    if(escolha) {
        
    }
}