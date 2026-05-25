// 1. Proteção de rota
const emailLogado = sessionStorage.getItem('emailLogado');
const cliente = JSON.parse(sessionStorage.getItem('cliente'));

if (!emailLogado || !cliente) {
    alert('Você precisa estar logado como cliente para solicitar um serviço.');
    window.location.href = 'login.html';
}

// 2. Parâmetro da URL
const params = new URLSearchParams(window.location.search);
const prestadorId = params.get('id');

// 3. Carregar dados do prestador
async function carregarPrestador() {
    try {
        const res = await fetch(`http://localhost:8080/prestadores/${prestadorId}`);
        const prestador = await res.json();

        document.getElementById('nome').value      = prestador.nome;
        document.getElementById('email').value     = prestador.email;
        document.getElementById('servico').value   = prestador.servicos;
        document.getElementById('descricao').value = prestador.descricao;
    } catch (e) {
        alert('Erro ao carregar dados do prestador.');
    }
}

carregarPrestador();

// 4. Enviar solicitação
document.getElementById('formulario').addEventListener('submit', async function (e) {
    e.preventDefault();

    const body = {
        tipo:        document.getElementById('tipo_servico').value,
        data:        document.getElementById('data_servico').value,
        descricao:   document.getElementById('descricao_servico').value,
        prestadorId: prestadorId,
        clienteId: cliente.clienteID
    };

    try {
        const res = await fetch('http://localhost:8080/servicos', {
            method:  'POST',
            headers: { 'Content-Type': 'application/json' },
            body:    JSON.stringify(body)
        });

        if (res.ok) {
            alert('Serviço solicitado com sucesso!');
            window.location.href = 'cliente.html';
        } else {
            alert('Erro ao solicitar serviço. Tente novamente.');
        }
    } catch (e) {
        alert('Erro de conexão com o servidor.');
    }
});