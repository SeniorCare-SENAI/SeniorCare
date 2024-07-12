buscarEstoque = document.getElementById('buscarEstoque') 
listarEsto = document.getElementById('listarEsto') 

resBusc = document.getElementById('resBusc') 
resList = document.getElementById('resList') 

buscarEstoque.addEventListener('click',()=>{
    let nomeProdEstoque = document.getElementById('nomeProdEstoque').value 
    
    const dados = {
        nomeProduto: nomeProdEstoque
    }
    
    fetch(`http://localhost:8080/estoque/${nomeProdEstoque}`)
    .then(resposta => resposta.json(dados))
    .then(valores => {
        resBusc.innerHTML = `Código Estoque: ${valores.codEstoque} <br> Código Produto: ${valores.codProduto} <br> Nome Produto ${valores.nomeProduto} <br> Quantidade Produto ${valores.quantidadeProduto}`
    })
    .catch((err) => console.error("Falha ao tentar encontrar Produto!", err))
})

listarEsto.addEventListener('click',()=>{
    fetch('http://localhost:8080/estoque')
    .then(resposta => resposta.json())
    .then(dados => {
        console.log(dados)
        resList.innerHTML = `` 

        dados.forEach(dad => {
            resList.innerHTML += `<tr> <td> ${dad.codEstoque} </td> <td> ${dad.codProduto} </td> <td> ${dad.nomeProduto} </td> <td> ${dad.quantidadeProduto} </td> </tr>`
        })
    })
    .catch((err) => console.error("Falha ao listar todos os produtos", err))
})