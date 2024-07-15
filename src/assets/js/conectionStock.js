buscarEstoque = document.getElementById('buscarEstoque')
listarEsto = document.getElementById('listarEsto')

resProc = document.getElementById('resProc')
resList = document.getElementById('resList')

buscarEstoque.addEventListener('click', () => {
    let nomeProdEstoque = Number(document.getElementById('nomeProdEstoque').value)

    resProc.innerHTML = ''

    if (nomeProdEstoque == 0) {
        resProc.innerHTML += `<div class='respostinha'>Precisa informa o código para que possamos buscar </div>`
    } else {
        const dados = {
            nomeProduto: nomeProdEstoque
        }

        fetch(`http://localhost:8080/estoque/${nomeProdEstoque}`)
            .then(resposta => resposta.json(dados))
            .then(valores => {
                resProc.innerHTML += `<div class='respostinha'> <p>Código Estoque: ${valores.codEstoque} </p> <p> Código Produto: ${valores.codProduto} </p> <p> Nome Produto ${valores.nomeProduto} </p> <p> Quantidade Produto ${valores.quantidadeProduto}</p> </div>`
            })
            .catch((err) => {
                console.error("Falha ao tentar encontrar produto!", err)
                resProc.innerHTML += `<div class='respostinha'> Código Inválido </div>`
            })
    }
})

listarEsto.addEventListener('click', () => {
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