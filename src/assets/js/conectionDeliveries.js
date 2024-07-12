cadastrarEntrega = document.getElementById('cadastrarEntrega')
buscarEntrega = document.getElementById('buscarEntrega')
listarEntreg = document.getElementById('listarEntreg')

resCads = document.getElementById('resCads')
resBusc = document.getElementById('resBusc')
resList = document.getElementById('resList')

cadastrarEntrega.addEventListener('click', ()=>{
    const dataEntreg = document.getElementById('dataEntreg').value
    const resposavelEntreg = document.getElementById('resposavelEntreg').value
    const nomeProdEntrega = document.getElementById('nomeProdEntrega').value
    const qtdeEntrega = document.getElementById('qtdeEntrega').value
    const codFunc = Number(document.getElementById('codFunc').value)
    const codEsto = Number(document.getElementById('codEsto').value)
    
    const dados = {
        dataEntrega:dataEntreg,
        responsavelEntrega:resposavelEntreg,
        nomeProdutoEntrega:nomeProdEntrega,
        quantidadeEntrega:qtdeEntrega,
        funcionarioId:codFunc,
        estoqueId:codEsto
    }

    console.log(dados)

    if((dataEntreg == '')||(resposavelEntreg == '')||(nomeProdEntrega == '')||(qtdeEntrega == 0)||(codFunc == 0)||(codEsto == 0)){
        resCads.innerHTML = `você não pode deixar de colocar as informações acima`
    }else{
        fetch('http://localhost:8080/entrega',{
            method : "POST",
            headers : {"Content-Type":"application/json"},
            body: JSON.stringify(dados)
        })
        .then(resultado => resultado.json())
        .then(valores => {
            console.log(valores)
            resCads.innerHTML = `Código Entrega: ${valores.codEntrega} <br> Data Entrega: ${valores.dataEntrega} <br> Responsável Entrega: ${valores.responsavelEntrega} <br> Nome Produto: ${valores.nomeProdutoEntrega} <br> Quantidade Produto: ${valores.quantidadeEntrega} <br> Código Funcionário: ${valores.funcionarioId} <br> Código Estoque: ${valores.estoqueId} <br>`
    })
    .catch((err)=>{
        console.error("Erro de conexão",err)
    })
    }
})

buscarEntrega.addEventListener('click',()=>{
    let codEntreg = Number(document.getElementById('codEntreg').value) 
    
    const dados = {
        codEntrega: codEntreg
    }
    
    fetch(`http://localhost:8080/entrega/${codEntreg}`)
    .then(resposta => resposta.json(dados))
    .then(valores => {
        console.log(valores)
        resBusc.innerHTML = `Código Entrega: ${valores.codEntrega} <br> Data Entrega: ${valores.dataEntrega} <br> Responsável Entrega: ${valores.responsavelEntrega} <br> Nome Produto: ${valores.nomeProdutoEntrega} <br> Quantidade Produto: ${valores.quantidadeEntrega} <br> Código Funcionário: ${valores.funcionarioId} <br> Código Estoque: ${valores.estoqueId} <br>`
    })
    .catch((err) => console.error("Falha ao tentar encontrar Fabricante!", err))
})

listarEntreg.addEventListener('click', ()=>{
    fetch('http://localhost:8080/entrega')
    .then(resposta => resposta.json())
    .then(dados => {
        console.log(dados)
        resList.innerHTML = `` 
        dados.forEach(dad => {
            resList.innerHTML += `<tr> <td> ${dad.codEntrega} </td> <td> ${dad.dataEntrega} </td> <td> ${dad.responsavelEntrega} </td> <td> ${dad.nomeProdutoEntrega} </td> <td> ${dad.quantidadeEntrega} </td> <td> ${dad.funcionarioId} </td> <td> ${dad.estoqueId} </td>`
        })
    })
    .catch((err) => console.error("Falha ao listar todos os entregas", err))
});