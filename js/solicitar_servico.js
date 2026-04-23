const URL_GET = "http://localhost:8080/prestador"; // removido o ; da URL
const URL_POST = "http://localhost:8080/servico";  // removido o ; da URL

const clienteId = localStorage.getItem('clienteId');
let prestadorId = null; // variável global para guardar o id

async function carregarDadosPrestador() {
    try {
        const response = await fetch(URL_GET);

        if (response.ok) {
            const prestador = await response.json();

            // Armazena o id para usar no POST depois
            prestadorId = prestador.id;

            // Preenche os campos do formulário
            document.getElementById('nome').value = prestador.nome;
            document.getElementById('email').value = prestador.email;
            document.getElementById('servico').value = prestador.servico;
            document.getElementById('descricao').value = prestador.descricao;

            console.log('ID do prestador armazenado:', prestadorId);
        } else {
            console.error('Erro ao buscar prestador:', response.status);
        }

    } catch (error) {
        console.error('Erro de conexão:', error.message);
    }
}

carregarDadosPrestador();


// post para enviar os dados do serviço solicitado para o backend


document.getElementById('formulario').addEventListener('submit', async function(event) {
    event.preventDefault(); 

    
   const formularioSolicitacao = {
        prestadorId : prestadorId,
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,            
        // Dados do serviço a ser solicitado
        clienteId: clienteId, // Inclui o ID do prestador           
        tipo_servico: document.getElementById('tipo_servico').value,        
        data_servico: document.getElementById('data_servico').value,        
        descricao_servico: document.getElementById('descricao_servico').value,       
    };

    try {
        const response = await fetch(`${URL_POST}/api/servicos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formularioSolicitacao)
        });

        if (response.ok) {
            alert('Solicitação realizada com sucesso!');
            window.location.href = '../index.html'; // Redireciona após sucesso
        } else {
            const erro = await response.json();
            alert('Erro: ' + (erro.message || 'Falha ao enviar os dados.'));
        }

    } catch (error) {
        alert('Erro de conexão com o servidor: ' + error.message);
    }
});
 