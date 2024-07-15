cadastrarFabricante = document.getElementById('cadastrarFabricante')
buscarFabricante = document.getElementById('buscarFabricante')
apagarFabricante = document.getElementById('apagarFabricante')
listarFabri = document.getElementById('listarFabri')

resCads = document.getElementById('resCads')
resProc = document.getElementById('resProc')
resDele = document.getElementById('resDele')
resList = document.getElementById('resList')

cadastrarFabricante.addEventListener('click', () => {
    const nomeFabri = document.getElementById('nomeFabri').value
    const codFunc = document.getElementById('codFunc').value

    resCads.innerHTML = ''

    if ((nomeFabri == '') || (codFunc == '')) {
        resCads.innerHTML += `<div class='respostinha'>Você não pode deixar de colocar as informações acima </div>`
    } else {

        const dados = {
            nomeFabricante: nomeFabri,
            codFuncionario: codFunc
        }

        console.log(dados)

        fetch('http://localhost:8080/fabricante', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dados)
        })
            .then(resultado => resultado.json())
            .then(valores => {
                console.log(valores)
                resCads.innerHTML += `<div class='respostinha'> Código Fabricante: ${valores.codFabricante} <br> Nome Fabricante: ${valores.nomeFabricante} <br> Código Funcionário ${valores.codFuncionario} </div>`
            })
            .catch((err) => {
                console.error("Erro de conexão", err)
            })
    }
})

buscarFabricante.addEventListener('click', () => {
    let codFabri = Number(document.getElementById('codFabri').value)

    resProc.innerHTML = ''

    if (codFabri == 0) {
        resProc.innerHTML += `<div class='respostinha'>Precisa informa o código para que possamos buscar </div>`
    } else {
        const dados = {
            codFabricante: codFabri
        }

        fetch(`http://localhost:8080/fabricante/${codFabri}`)
            .then(resposta => resposta.json(dados))
            .then(valores => {
                resProc.innerHTML += `<div class='respostinha'> <p>Código Fabricante: ${valores.codFabricante}</p> <p> Nome Fabricante: ${valores.nomeFabricante}</p> <p>Código Funcionário ${valores.codFuncionario}</p></div>`
            })
            .catch((err) => {
                console.error("Falha ao tentar encontrar fabricante!", err)
                resProc.innerHTML += `<div class='respostinha'> Código Inválido </div>`
            })
    }
})

apagarFabricante.addEventListener('click', () => {
    let codFabriA = Number(document.getElementById('codFabriA').value)

    resDele.innerHTML = ''

    if (codFabriA == 0) {
        resDele.innerHTML += `<div class='respostinha'>Precisa informa o código para que possamos apagar</div>`
    } else {
        let escolha = confirm('Tem certeza que desejá apagar? ' + codFabriA)

        if (escolha) {

            fetch(`http://localhost:8080/fabricante/${codFabriA}`, {
                method: "DELETE",
            })
                .then(resposta => resposta.text())
                .then(resDele.innerHTML += "Fabricante apagado com sucesso!")
                .catch((err) => {
                    console.error("Erro ao apagar o fabricante!", err)
                    resDele.innerHTML += `<div class='respostinha'>Código Inválido</div>`
                })
        } else {
            alert('Digite o código corretamente')
        }

    }
})

listarFabri.addEventListener('click', () => {
    fetch('http://localhost:8080/fabricante')
        .then(resposta => resposta.json())
        .then(dados => {
            console.log(dados)
            resList.innerHTML = ''
            dados.forEach(dad => {
                resList.innerHTML += `<tr> <td> ${dad.codFabricante} </td> <td> ${dad.nomeFabricante} </td> <td> ${dad.codFuncionario} </td> </tr>`

            })
        })
        .catch((err) => console.error("Falha ao listar todos os fabricantes", err))
})