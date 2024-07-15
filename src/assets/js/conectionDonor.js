let cadastrarDoador = document.getElementById('cadastrarDoador')
let buscarDoador = document.getElementById('buscarDoador')
let apagarDoador = document.getElementById('apagarDoador')
let listarDoar = document.getElementById('listarDoar')

let resCads = document.getElementById('resCads')
let resProc = document.getElementById('resProc')
let resDele = document.getElementById('resDele')
let resList = document.getElementById('resList')

cadastrarDoador.addEventListener('click', () => {
    const cnpjDoa = document.getElementById('cnpjDoa').value
    const cpfDoa = document.getElementById('cpfDoa').value
    const nomeDoa = document.getElementById('nomeDoa').value
    const emailDoa = document.getElementById('emailDoa').value
    const enderecoDoa = document.getElementById('enderecoDoa').value
    const codFunc = document.getElementById('codFunc').value
    const situacaoDoa = document.getElementById('situacaoDoa').value
    const telefoneDoa = document.getElementById('telefoneDoa').value

    resCads.innerHTML = ''


    if (((cpfDoa == '') && (cnpjDoa == '')) || (enderecoDoa == '') || (nomeDoa == '') || (codFunc == '') || (telefoneDoa == '') || (emailDoa == '')) {
        resCads.innerHTML = `<div class='respostinha'>Você não pode deixar de colocar as Informações nos campos a cima </div>`
    } else {

        const dados = {
            cnpjDoador: cnpjDoa,
            cpfDoador: cpfDoa,
            nomeDoador: nomeDoa,
            emailDoador: emailDoa,
            enderecoDoador: enderecoDoa,
            codFuncionario: codFunc,
            situacaoDoador: situacaoDoa,
            telefoneDoador: telefoneDoa
        }

        console.log(dados)

        fetch('http://localhost:8080/doador', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dados)
        })
            .then(resultado => resultado.json())
            .then(valores => {
                console.log(valores)
                if (cpf == '') {
                    resCads.innerHTML = `<div class='respostinha'> <p>Código: ${valores.codDoador}</p> <p>Nome: ${valores.nomeDoador}</p> <p>CPF: ${valores.cpfDoador}</p> <p>Endereço: ${valores.enderecoDoador}</p> <p>Email: ${valores.emailDoador}</p> <p>Situação: ${valores.situacaoDoador}</p> <p>Telefone: ${valores.telefoneDoador}</p> </div> Código do Funcionário: ${valores.codFuncionario}`
                } else if (cnpj == '') {
                    resCads.innerHTML = `<div class='respostinha'> <p>Código: ${valores.codDoador}</p> <p>Nome: ${valores.nomeDoador}</p> <p>CNPJ: ${valores.cnpjDoador}</p> <p>Situação: ${valores.situacaoDoador}</p> <p>Telefone: ${valores.telefoneDoador}</p> </div> Código do Funcionário: ${valores.codFuncionario}`
                }
            })
            .catch((err) => {
                console.error('Erro de conexão', err)
            })
    }
})

buscarDoador.addEventListener('click', () => {
    let codDoa = Number(document.getElementById('codDoa').value)

    resProc.innerHTML = ''

    if (codDoa == 0) {
        resProc.innerHTML += `<div class='respostinha'>Precisa informa o código para que possamos buscar </div>`
    } else {
        const dados = {
            codDoador: codDoa
        }

        fetch(`http://localhost:8080/doador/${codDoa}`)
            .then(resposta => resposta.json(dados))
            .then(valores => {
                resProc.innerHTML += `<div class='respostinha'> <p>Código: ${valores.codDoador}</p> <p>Nome: ${valores.nomeDoador}</p> <p>CPF: ${valores.cpfDoador}</p> <p>CNPJ: ${valores.cnpjDoador}</p> <p>Endereço: ${valores.enderecoDoador}</p> <p>Email: ${valores.emailDoador}</p> <p>Situação: ${valores.situacaoDoador}</p> <p>Telefone: ${valores.telefoneDoador}</p> </div> Código do Funcionário: ${valores.codFuncionario}`
            })
            .catch((err) => {
                console.error("Falha ao tentar encontrar Doador!", err)
                resProc.innerHTML += `<div class='respostinha'> Código Inválido </div>`

            })
    }
})

apagarDoador.addEventListener('click', () => {
    let codDoaA = Number(document.getElementById('codDoaA').value)

    resDele.innerHTML = ''

    if (codDoaA == 0) {
        resDele.innerHTML += `<div class='respostinha'>Precisa informa o código para que possamos apagar</div>`
    } else {
        let escolha = confirm('Tem certeza que desejá apagar?' + codDoaA)

        if (escolha) {
            fetch(`http://localhost:8080/doador/${codDoaA}`, {
                method: "DELETE",
            })
                .then(resposta => resposta.text())
                .then(resDele.innerHTML += "<div class='respostinha'>Doador apagado com sucesso!</div>")
                .catch((err) => {
                    console.error("Erro ao apagar o Doador!", err)
                    resDele.innerHTML += `<div class='respostinha'>Código Inválido</div>`
                })
        } else {
            alert('Digite o código corretamente')
        }
    }
})

listarDoar.addEventListener('click', () => {
    fetch('http://localhost:8080/doador')
        .then(resposta => resposta.json())
        .then(dados => {
            console.log(dados)
            resList.innerHTML = ``
            dados.forEach(dad => {
                resList.innerHTML += `<tr> <td> ${dad.codDoador} </td> <td> ${dad.nomeDoador} </td> <td> ${dad.cnpjDoador} </td> <td> ${dad.cpfDoador} </td> <td> ${dad.situacaoDoador} </td> <td> ${dad.enderecoDoador} </td> <td> ${dad.emailDoador} </td> <td> ${dad.telefoneDoador} </td> <td> ${dad.codFuncionario} </td> </tr>`

            })
        })
        .catch((err) => console.error("Falha ao listar todos os fabricantes", err))
})