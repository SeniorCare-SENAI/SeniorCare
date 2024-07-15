let cadastrarFuncionario = document.getElementById('cadastrarFuncionario')
let buscarFuncionario = document.getElementById('buscarFuncionario')
let apagarFuncionario = document.getElementById('apagarFuncionario')
let listarFun = document.getElementById('listarFun')

let resCads = document.getElementById('resCads')
let resProc = document.getElementById('resProc')
let resDele = document.getElementById('resDele')
let resList = document.getElementById('resList')

cadastrarFuncionario.addEventListener('click', () => {
    const nomeFunc = document.getElementById('nomeFunc').value
    const cpfFunc = document.getElementById('cpfFunc').value
    const telefoneFunc = document.getElementById('telefoneFunc').value
    const cargoFunc = document.getElementById('cargoFunc').value
    const situacaoFunc = document.getElementById('situacaoFunc').value

    resCads.innerHTML = ''

    if ((nomeFunc == '') || (cpfFunc == '') || (telefoneFunc == '') || (cargoFunc == '')) {
        resCads.innerHTML = `<div class='respostinha'>Você não pode deixar de colocar as informações acima </div>`
    } else {

        const dados = {
            nomeFuncionario: nomeFunc,
            cpfFuncionario: cpfFunc,
            telefoneFuncionario: telefoneFunc,
            cargoFuncionario: cargoFunc,
            situacaoFuncionario: situacaoFunc
        }

        console.log(dados)

        fetch('http://localhost:8080/funcionario', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dados)
        })
            .then(resultado => resultado.json())
            .then(valores => {
                console.log(valores)
                resCads.innerHTML = `<div class='respostinha'> <p>Código: ${valores.codFuncionario}</p> <p>Nome: ${valores.nomeFuncionario}</p> <p>Cargo: ${valores.cargoFuncionario}</p> <p>CPF: ${valores.cpfFuncionario}</p> <p>Situação: ${valores.situacaoFuncionario}</p> <p>Telefone: ${valores.telefoneFuncionario}</p> </div>`
            })
            .catch((err) => {
                console.error("Erro de conexão", err)
            })
    }
})

buscarFuncionario.addEventListener('click', () => {
    let codFunc = Number(document.getElementById('codFunc').value)

    resProc.innerHTML = ''

    if (codFunc == 0) {
        resProc.innerHTML += `<div class='respostinha'>Precisa informa o código para que possamos buscar </div>`
    } else {
        const dados = {
            codFuncionario: codFunc
        }

        fetch(`http://localhost:8080/funcionario/${codFunc}`)
            .then(resposta => resposta.json(dados))
            .then(valores => {
                resProc.innerHTML += `<div class='respostinha'> <p>Código: ${valores.codFuncionario}</p> <p>Nome: ${valores.nomeFuncionario}</p> <p>Cargo: ${valores.cargoFuncionario}</p> <p>CPF: ${valores.cpfFuncionario}</p> <p>Situação: ${valores.situacaoFuncionario}</p> <p>Telefone: ${valores.telefoneFuncionario}</p> </div>`
            })
            .catch((err) => {
                console.error("Falha ao tentar encontrar funcionário!", err)
                resProc.innerHTML += `<div class='respostinha'> Código Inválido </div>`
            })
    }
});

apagarFuncionario.addEventListener('click', () => {
    let codFuncA = Number(document.getElementById('codFuncA').value)
    
    resDele.innerHTML = ``

    if (codFuncA == 0) {
        resDele.innerHTML += `<div class='respostinha'>Precisa informa o código para que possamos apagar</div>`
    } else {
        let escolha = confirm('Tem certeza que deseja apagar? ' +codFuncA)

        if (escolha) {
            fetch(`http://localhost:8080/funcionario/${codFuncA}`, {
                method: "DELETE",
            })
            .then(resposta => resposta.text())
            .then(resDele.innerHTML += "<div class='respostinha'>Funcionario apagado com sucesso!</div>")
            .catch((err) => {
                console.error("Erro ao apagar o funcionario!", err)
                resDele.innerHTML += `<div class='respostinha'>Código Inválido</div>`
            })
        } else {
            alert('Digite o código corretamente')
        }
    }


});


listarFun.addEventListener('click', () => {
    fetch('http://localhost:8080/funcionario')
        .then(resposta => resposta.json())
        .then(dados => {
            console.log(dados)
            resList.innerHTML = ``
    
            dados.forEach(dad => {
                resList.innerHTML += `<tr> <td> ${dad.codFuncionario} </td> <td> ${dad.nomeFuncionario} </td> <td> ${dad.cargoFuncionario} </td> <td> ${dad.cpfFuncionario} </td> <td> ${dad.situacaoFuncionario} </td> <td> ${dad.telefoneFuncionario} </td> </tr>`
            })
        })
        .catch((err) => console.error("Falha ao listar todos os funcionários", err))
});