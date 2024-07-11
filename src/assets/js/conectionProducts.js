cadastrarProduto.addEventListener('click', ()=>{
    const nomeProd = document.getElementById('nomeProd').value
    const qtde = Number(document.getElementById('qtde').value)
    const valor = Number(document.getElementById('valor').value)
    const validade = Date(document.getElementById('validade').value)
    const doador = Number(document.getElementById('doador').value)
    const fabricante = Number(document.getElementById('fabricante').value)
    const funcionario = Number(document.getElementById('funcionario').value)
    const estoque = Number(document.getElementById('estoque').value)
    

    const dados = {
        nomeProduto: nomeProd,
        quantidadeProduto: qtde,
        valorProduto: valor,
        validadeProduto: validade,
        doadorId: doador,
        fabricanteId: fabricante,
        funcionarioId: funcionario,
        estoqueId: estoque
    }

    fetch('http://localhost:8080/produto',{
        method : "POST",
        headers : {"Content-Type":"application/json"},
        body: JSON.stringify(dados)
    })
    .then(resultado => resultado.json())
    .then(valores => {
        console.log(valores)
        resposta.innerHTML = "Codigo Produto: "+ valores.codProduto + "<br>"
        resposta.innerHTML += "Nome Produto: "+ valores.nomeProduto + "<br>"
        resposta.innerHTML += "Quantidade Produto: "+ valores.quantidadeProduto + "<br>"
        resposta.innerHTML += "Valor Produto: "+ valores.valorProduto + "<br>"
        resposta.innerHTML += "Validade Produto: "+ valores.validadeProduto + "<br>"
        resposta.innerHTML += "Doador Produto: "+ valores.doadorId + "<br>"
        resposta.innerHTML += "Fabricante Produto: "+ valores.fabricanteId + "<br>"
        resposta.innerHTML += "Funcionário Produto: "+ valores.funcionarioId + "<br>"
        resposta.innerHTML += "Estoque Produto: "+ valores.estoqueId 
    })
    .catch((err)=>{
        console.error("Erro de conexão",err)
    })
})

