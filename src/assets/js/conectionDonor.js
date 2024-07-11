let cadastrarDoador = document.getElementById('cadastrarDoador')

let resCadastro = document.getElementById('resCadastro')

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

    if(((cpf == '')||(cnpj == ''))||(endereco == '')||(nomeDoador == '')||(codFunc == '')||(telefone == '')) {
        resCadastro = `você não pode deixar de colocar as Informações nos campos a cima`
    } else {
        fetch('http://localhost:8080/doador',{
            method : "POST",
            headers : {"Content-Type":"application/json"},
            body: JSON.stringify(dados)
        })
        .then(resultado => resultado.json())
        .then(valores => {
            resCadastro.innerHTML = valores.codDoador
            if(cpf == ''){
                resCadastro.innerHTML += valores.cnpjDoador
            }else if (cnpj == '') {
                resCadastro.innerHTML += valores.cpfDoador
            }
            resCadastro.innerHTML += valores.enderecoDoador
            resCadastro.innerHTML += valores.nomeDoador
            resCadastro.innerHTML += valores.situacaoDoador
            resCadastro.innerHTML += valores.telefoneDoador
        })
        .catch((err)=>{
            console.error('Erro de conexão',err)
        })
    }
})