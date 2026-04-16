let tipo_usuario = document.getElementById("tipo_usuario");
let nome = document.getElementById("nome");
let email = document.getElementById("email");
let telefone = document.getElementById("telefone");
let cep = document.getElementById("cep");
let rua = document.getElementById("rua");
let bairro = document.getElementById("bairro");
let cidade = document.getElementById("cidade");
let estado = document.getElementById("estado");
let senha = document.getElementById("senha");
let confirmar_senha = document.getElementById("confirmar_senha");
let descricao = document.getElementById("descricao");

let butaoEnviar = document.querySelector('#botaoEnviar');

function enviarCadastro() {
    alert("Cadastro enviado com sucesso!");

}

butaoEnviar.addEventListener('click', enviarCadastro);