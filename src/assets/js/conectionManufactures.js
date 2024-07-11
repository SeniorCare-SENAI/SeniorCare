cadastrarFabricante = document.getElementById('cadastrarFabricante') 
buscarFabricante = document.getElementById('buscarFabricante') 
apagarFabricante = document.getElementById('apagarFabricante') 
listarFabri = document.getElementById('listarFabri') 

rescadastro = document.getElementById('rescadastro') 
resbusca = document.getElementById('resbusca') 
resapagar = document.getElementById('resapagar') 
res = document.getElementById('res') 

cadastrarFabricante.addEventListener('click',()=>{
    const nomeFabri = document.getElementById('nomeFabri').value
    const codFunc = document.getElementById('codFunc').value

    const dados = {
        nomeFabricante: nomeFabri,
        codFuncionario: codFunc
    }

    console.log(dados)

    if((nomeFabri == '')||(codFunc == 0)){
        rescadastro.innerHTML = `você não pode deixar de colocar as informações Nome Fabricante ou Codigo Funcionário`
    }
    // else if(codFunc == NaN){
    //     rescadastro.innerHTML = `Código de Funcionário inexistente`
    // }
    else{
        fetch('http://localhost:8080/fabricante',{
            method : "POST",
            headers : {"Content-Type":"application/json"},
            body: JSON.stringify(dados)
        })
        .then(resultado => resultado.json())
        .then(valores => {
            console.log(valores)
            rescadastro.innerHTML = `Código Fabricante: ${valores.codFabricante} <br> Nome Fabricante: ${valores.nomeFabricante} <br> Código Funcionário ${valores.codFuncionario}`
        })
        .catch((err)=>{
            console.error("Erro de conexão", err)
        })
    }

})

buscarFabricante.addEventListener('click',()=>{
    let codFabri = Number(document.getElementById('codFabri').value) 
    
    const dados = {
        codFabricante: codFabri
    }
    
    fetch(`http://localhost:8080/fabricante/${codFabri}`)
    .then(resposta => resposta.json(dados))
    .then(valores => {
        resbusca.innerHTML = `Código Fabricante: ${valores.codFabricante} <br> Nome Fabricante: ${valores.nomeFabricante} <br> Código Funcionário ${valores.codFuncionario}`
    })
    .catch((err) => console.error("Falha ao tentar encontrar Fabricante!", err))
})

apagarFabricante.addEventListener('click',()=>{
    let escolha = confirm('Tem certeza que desejá apagar?')
    
    if(escolha){
        let codFabriA = Number(document.getElementById('codFabriA').value) 
        console.log(codFabriA)

        fetch(`http://localhost:8080/fabricante/${codFabriA}`,{
            method: "DELETE",
            headers: {"Content-Type":"application/json"}
        })
        .then(resposta => resposta.text())
        .then(dados => {
        resapagar.innerHTML = "Fabricante apagado com sucesso!"
    })
    .catch((err) => console.error("Erro ao apagar o fabricante!", err))
    }else {
        alert('Digite o código corretamente')
    }
})

listarFabri.addEventListener('click',()=>{
    fetch('http://localhost:8080/fabricante')
    .then(resposta => resposta.json())
    .then(dados => {
        console.log(dados)
        res.innerHTML = `<table>
        </table>` 

        res.innerHTML = ""
        dados.forEach(dad => {
            res.innerHTML += `<tr> <td> ${dad.codFabricante} </td> <td> ${dad.nomeFabricante} </td> <td> ${dad.codFuncionario} </td> </tr>`

        })
    })
    .catch((err) => console.error("Falha ao listar todos os fabricantes", err))
})