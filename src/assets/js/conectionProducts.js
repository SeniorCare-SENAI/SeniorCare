let cadastrarProduto = document.getElementById('cadastrarProduto')
let buscarProduto = document.getElementById('buscarProduto')
let apagarProduto = document.getElementById('apagarProduto')
let listarProd = document.getElementById('listarProd')

let resposta = document.getElementById('resposta')
let resbuscar = document.getElementById('resbuscar')
let resApagar = document.getElementById('resApagar')
let res = document.getElementById('res')

cadastrarProduto.addEventListener('click', ()=>{
    const nomeProd = document.getElementById('nomeProd').value
    const qtde = Number(document.getElementById('qtde').value)
    const valor = Number(document.getElementById('valor').value)
    const validade = document.getElementById('validade').value
    const doador = Number(document.getElementById('doador').value)
    const fabricante = Number(document.getElementById('fabricante').value)
    const funcionario = Number(document.getElementById('funcionario').value)
    const desc = document.getElementById('desc').value
    

    const dados = {
        nomeProduto:nomeProd,
        quantidadeProduto:qtde,
        valorProduto:valor,
        validadeProduto:validade,
        doadorId:doador,
        fabricanteId:fabricante,
        funcionarioId:funcionario,
        descricaoProduto:desc
    }

    console.log(dados)

    if((nomeProd == '')||(qtde == '')||(valor == '')||(validade == '')||(validade == '')||(doador == 0)||(fabricante == 0)||(funcionario == 0)){
        resposta.innerHTML = `você não pode deixar de colocar as informações acima`
    }else{
        fetch('http://localhost:8080/produto',{
            method : "POST",
            headers : {"Content-Type":"application/json"},
            body: JSON.stringify(dados)
        })
        .then(resultado => resultado.json())
        .then(valores => {
            console.log(valores)
            resposta.innerHTML = `Código Produto: ${valores.codProduto} <br> Nome Produto: ${valores.nomeProduto} <br> Quantidade Produto ${valores.quantidadeProduto} <br> Valor Produto ${valores.valorProduto} <br> Validade Produto ${valores.validadeProduto} <br> Código Doador ${valores.doadorId} <br> Código Fabricante ${valores.fabricanteId} <br> Código Funcionário ${valores.funcionarioId}<br> Descrição Produto ${valores.descricaoProduto}`
    })
    .catch((err)=>{
        console.error("Erro de conexão",err)
    })
    }
})
