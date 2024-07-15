let cadastrarProduto = document.getElementById('cadastrarProduto')
let listarProd = document.getElementById('listarProd')

let resCads = document.getElementById('resCads')
let resList = document.getElementById('resList')

cadastrarProduto.addEventListener('click', () => {
    const nomeProd = document.getElementById('nomeProd').value
    const qtdeProd = Number(document.getElementById('qtdeProd').value)
    const valorProd = Number(document.getElementById('valorProd').value)
    const validadeProd = document.getElementById('validadeProd').value
    const doador = Number(document.getElementById('doador').value)
    const fabricante = Number(document.getElementById('fabricante').value)
    const funcionario = Number(document.getElementById('funcionario').value)
    const descProd = document.getElementById('descProd').value

    resCads.innerHTML = ''

    if ((nomeProd == '') || (qtdeProd == 0) || (valorProd == 0) || (validadeProd == '') || (doador == 0) || (fabricante == 0) || (funcionario == 0)) {
        resCads.innerHTML += `<div class='respostinha'>Você não pode deixar de colocar as informações acima </div>`
    } else {

        const dados = {
            nomeProduto: nomeProd,
            quantidadeProduto: qtdeProd,
            valorProduto: valorProd,
            validadeProduto: validadeProd,
            doadorId: doador,
            fabricanteId: fabricante,
            funcionarioId: funcionario,
            descricaoProduto: descProd
        }

        console.log(dados)

        fetch('http://localhost:8080/produto', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dados)
        })
        .then(resultado => resultado.json())
        .then(valores => {
            console.log(valores)
            resCads.innerHTML += `<div class='respostinha'><p> Código Produto: ${valores.codProduto} </p> <p> Nome Produto: ${valores.nomeProduto} </p> <p> Quantidade Produto: ${valores.quantidadeProduto} </p> <p> Valor Produto: ${valores.valorProduto} </p> <p> Validade Produto: ${valores.validadeProduto} </p> <p> Código Doador: ${valores.doadorId} </p> <p> Código Fabricante: ${valores.fabricanteId} </p> <p> Código Funcionário: ${valores.funcionarioId}</p> <p> Descrição Produto: ${valores.descricaoProduto}</p> </div>`
        })
        .catch((err) => {
            console.error("Erro de conexão", err)
            resCads.innerHTML += `<div class='respostinha'>Confira novamente se os códigos foram inseridos corretamente</div>`
        })
    }
})

listarProd.addEventListener('click', () => {
    fetch('http://localhost:8080/produto')
        .then(resposta => resposta.json())
        .then(dados => {
            console.log(dados)
            resList.innerHTML = ''

            dados.forEach(dad => {
                resList.innerHTML += `<tr> <td> ${dad.codProduto} </td> <td> ${dad.nomeProduto} </td> <td> ${dad.quantidadeProduto} </td> <td> ${dad.valorProduto} </td> <td> ${dad.validadeProduto} </td> <td> ${dad.doadorId} </td> <td> ${dad.fabricanteId} </td> <td> ${dad.funcionarioId} </td> <td> ${dad.descricaoProduto} </td> </tr>`
            })
        })
        .catch((err) => console.error("Falha ao listar todos os funcionários", err))
});