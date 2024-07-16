cadastrarEntrega = document.getElementById('cadastrarEntrega')
buscarEntrega = document.getElementById('buscarEntrega')
listarEntreg = document.getElementById('listarEntreg')

resCads = document.getElementById('resCads')
resProc = document.getElementById('resProc')
resList = document.getElementById('resList')

cadastrarEntrega.addEventListener('click', () => {
    const dataEntreg = document.getElementById('dataEntreg').value
    const resposavelEntreg = document.getElementById('resposavelEntreg').value
    const nomeProdEntrega = document.getElementById('nomeProdEntrega').value
    const qtdeEntrega = document.getElementById('qtdeEntrega').value
    const codFunc = Number(document.getElementById('codFunc').value)
    const codEsto = Number(document.getElementById('codEsto').value)

    resCads.innerHTML = ''

    if ((dataEntreg == '') || (resposavelEntreg == '') || (nomeProdEntrega == '') || (qtdeEntrega == 0) || (codFunc == 0) || (codEsto == 0)) {
        resCads.innerHTML += `<div class='respostinha'>Você não pode deixar de colocar as informações acima </div>`
    } else {
        const dados = {
            dataEntrega: dataEntreg,
            responsavelEntrega: resposavelEntreg,
            nomeProdutoEntrega: nomeProdEntrega,
            quantidadeEntrega: qtdeEntrega,
            funcionarioId: codFunc,
            estoqueId: codEsto
        }

        console.log(dados)

        fetch('http://localhost:8080/entrega', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dados)
        })
            .then(resultado => resultado.json())
            .then(valores => {
                console.log(valores)
                resCads.innerHTML += `<div class='respostinha'><p>Código Entrega: ${valores.codEntrega} </p> <p> Data Entrega: ${valores.dataEntrega} </p> <p> Responsável Entrega: ${valores.responsavelEntrega} </p> <p> Nome Produto: ${valores.nomeProdutoEntrega} </p> <p> Quantidade Produto: ${valores.quantidadeEntrega} </p> <p> Código Funcionário: ${valores.funcionarioId} </p> <p> Código Estoque: ${valores.estoqueId} </p></div>`
            })
            .catch((err) => {
                console.error("Erro de conexão", err)
            })
    }
})

buscarEntrega.addEventListener('click', () => {
    let codEntreg = Number(document.getElementById('codEntreg').value)

    resProc.innerHTML = ''

    if(codEntreg == 0 ){
        resProc.innerHTML += `<div class='respostinha'>Precisa informa o código para que possamos buscar </div>`
    }else {
        const dados = {
            codEntrega: codEntreg
        }
    
        fetch(`http://localhost:8080/entrega/${codEntreg}`)
        .then(resposta => resposta.json(dados))
        .then(valores => {
            console.log(valores)
            resProd.innerHTML += `<div class='respostinha'> <p>Código Entrega: ${valores.codEntrega} </p> <p> Data Entrega: ${valores.dataEntrega} </p> <p> Responsável Entrega: ${valores.responsavelEntrega} </p> <p> Nome Produto: ${valores.nomeProdutoEntrega} </p> <p> Quantidade Produto: ${valores.quantidadeEntrega} </p> <p> Código Funcionário: ${valores.funcionarioId} </p> <p> Código Estoque: ${valores.estoqueId} </p> </div>`
        })
        .catch((err) => {
            console.error("Falha ao tentar encontrar entrega!", err)
            resProc.innerHTML += `<div class='respostinha'> Código Inválido </div>`
        })
    }
})

listarEntreg.addEventListener('click', () => {
    fetch('http://localhost:8080/entrega')
        .then(resposta => resposta.json())
        .then(dados => {
            console.log(dados)
            resList.innerHTML = ''
            dados.forEach(dad => {
                resList.innerHTML += `<tr> <td> ${dad.codEntrega} </td> <td> ${dad.dataEntrega} </td> <td> ${dad.responsavelEntrega} </td> <td> ${dad.nomeProdutoEntrega} </td> <td> ${dad.quantidadeEntrega} </td> <td> ${dad.funcionarioId} </td> <td> ${dad.estoqueId} </td>`
            })
        })
        .catch((err) => console.error("Falha ao listar todos os entregas", err))
});