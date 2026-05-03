
const API_URL = 'http://localhost:8080';

document.getElementById('formulario').addEventListener('submit', async function(event) {
    event.preventDefault(); 

    
    const senha = document.getElementById('senha').value;
    const confirmarSenha = document.getElementById('confirmar_senha').value;

    

    if (senha !== confirmarSenha) {
        alert('As senhas não coincidem!');
        return;
    }

    //pegar os valors do checkbox.
    const servicosMarcados = Array.from(document.querySelectorAll('input[name="servico"]:checked'))
                              .map(checkbox => checkbox.value);
    
    const formularioDados = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        telefone: document.getElementById('telefone').value,
        senha: senha,
        descricao: document.getElementById('descricao').value,        
        servicos: servicosMarcados.join(',')
    };

    try {
        const response = await fetch(`${API_URL}/prestadores`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formularioDados)
        });

        if (response.ok) {
            alert('Cadastro realizado com sucesso!');
            window.location.href = '../index.html'; // Redireciona após sucesso
        } else {
            const erro = await response.json();
            alert('Erro: ' + (erro.message || 'Falha ao enviar os dados.'));
        }

    } catch (error) {
        alert('Erro de conexão com o servidor: ' + error.message);
    }
});