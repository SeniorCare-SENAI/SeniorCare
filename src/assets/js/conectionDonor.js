let cadastrarDoador = document.getElementById('cadastrarDoador')
let buscarDoador = document.getElementById('buscarDoador')
let apagarDoador = document.getElementById('apagarDoador')
let listarDoar = document.getElementById('listarDoar')

let resCadastro = document.getElementById('resCadastro')
let resbuscar = document.getElementById('resbuscar')
let resApagar = document.getElementById('resApagar')
let resList = document.getElementById('resList')

cadastrarDoador.addEventListener('click', ()=>{
    const cpf = document.getElementById('cpf').value
    const cnpj = document.getElementById('cnpj').value
    const endereco = document.getElementById('endereco').value
    const nomeDoador = document.getElementById('nomeDoador').value
    const codFunc = document.getElementById('codFunc').value
    const situacao = document.getElementById('situacao').value
    const telefone = document.getElementById('telefone').value

    const dados = {
        cpfDoador: cpf,
        cnpjDoador: cnpj,
        enderecoDoador: endereco,
        nomeDoador: nomeDoador,
        codFuncionario: codFunc,
        situacaoDoador: situacao,
        telefoneDoador: telefone
    }

    console.log(dados)

    if(((cpf == '')&&(cnpj == ''))||(endereco == '')||(nomeDoador == '')||(codFunc == '')||(telefone == '')) {
        resCadastro.innerHTML = `você não pode deixar de colocar as Informações nos campos a cima`
    } else {
        fetch('http://localhost:8080/doador',{
            method : "POST",
            headers : {"Content-Type":"application/json"},
            body: JSON.stringify(dados)
        })
        .then(resultado => resultado.json())
        .then(valores => {
            console.log(valores)

            resCadastro.innerHTML = `Código Doador: ${valores.codDoador} <br>`
            if(cpf == ''){
                resCadastro.innerHTML += `CNPJ Doador: ${valores.cnpjDoador} <br>`
            }else if (cnpj == '') {
                resCadastro.innerHTML += `CPF Doador: ${valores.cpfDoador} <br>`
            }
            resCadastro.innerHTML += `Endereço Doador: ${valores.enderecoDoador} <br> Nome Doador: ${valores.nomeDoador} <br> Situação Doador: ${valores.situacaoDoador} <br> Telefone Doador: ${valores.telefoneDoador} <br> 
            Código Funcionário: ${valores.codFuncionario}`
        })
        .catch((err)=>{
            console.error('Erro de conexão',err)
        })
    }
})

buscarDoador.addEventListener('click',()=>{
    let codDoa = Number(document.getElementById('codDoa').value) 

    const dados = {
        codDoador: codDoa
    }

    fetch(`http://localhost:8080/doador/${codDoa}`)
    .then(resposta => resposta.json(dados))
    .then(valores => {
        resbuscar.innerHTML = `Código Doador: ${valores.codDoador} <br> CNPJ Doador: ${valores.cnpjDoador} <br> CPF Doador: ${valores.cpfDoador} <br> Endereço Doador: ${valores.enderecoDoador} <br> Nome Doador: ${valores.nomeDoador} <br> Situação Doador: ${valores.situacaoDoador} <br> Telefone Doador: ${valores.telefoneDoador} <br> Código Funcionário: ${valores.codFuncionario}`
    })
    .catch((err) => console.error("Falha ao tentar encontrar Doador!", err))
})

apagarDoador.addEventListener('click',()=>{
    // let escolha = confirm('Tem certeza que desejá apagar?')
    
    // if(escolha){
        let codDoaA = Number(document.getElementById('codDoaA').value) 
        console.log(codDoaA)

        fetch(`http://localhost:8080/doador/${codDoaA}`,{
            method: "DELETE",
            headers: {"Content-Type":"application/json"}
        })
        .then(resposta => resposta.text())
        .then(dados => {
            resApagar.innerHTML = "Fabricante apagado com sucesso!"
    })
    .catch((err) => console.error("Erro ao apagar o Doador!", err))
    // }else {
    //     alert('Digite o código corretamente')
    // }
})
listarDoar.addEventListener('click',()=>{
    fetch('http://localhost:8080/doador')
    .then(resposta => resposta.json())
    .then(dados => {
        console.log(dados)
        resList.innerHTML = `` 
        dados.forEach(dad => {
            resList.innerHTML += `<tr> <td> ${dad.codDoador} </td> <td> ${dad.cnpjDoador} </td> <td> ${dad.cpfDoador} </td> <td> ${dad.enderecoDoador} </td> <td> ${dad.nomeDoador} </td> <td> ${dad.situacaoDoador} </td> <td> ${dad.telefoneDoador} </td> <td> ${dad.codFuncionario} </td> </tr>`

        })
    })
    .catch((err) => console.error("Falha ao listar todos os fabricantes", err))
})