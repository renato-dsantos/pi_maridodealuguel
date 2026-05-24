function openTabs(event, tabName) {
    document.querySelectorAll(".tabcontent").forEach(tab => tab.style.display = "none");
    document.querySelectorAll(".tablinks").forEach(link => link.classList.remove("active"));
    document.getElementById(tabName).style.display = "block";
    event.currentTarget.classList.add("active");
}

document.addEventListener("DOMContentLoaded", () => {
    // Abre a primeira aba automaticamente
    document.querySelector(".tablinks").click(); // 👈 Adicione essa linha

    carregarDadosCliente();
});


// Carrega dados do cliente logado
async function carregarDadosCliente() {
    const email = sessionStorage.getItem("emailLogado");

    if (!email) {
        alert("Sessão expirada, faça login novamente!");
        window.location.href = "../pages/login.html";
        return;
    }

    try {
        const response = await fetch(`http://localhost:8080/clientes/email/${email}`);

        if (!response.ok) throw new Error("Erro ao buscar cliente");

        const cliente = await response.json();

        // Salva o ID para usar no update
        sessionStorage.setItem("clienteID", cliente.clienteID);

        // Preenche o formulário
        document.getElementById("nome").value      = cliente.nome      ?? "";
        document.getElementById("email").value     = cliente.email     ?? "";
        document.getElementById("telefone").value  = cliente.telefone  ?? "";
        document.getElementById("cep").value       = cliente.cep       ?? "";
        document.getElementById("rua").value       = cliente.rua       ?? "";
        document.getElementById("bairro").value    = cliente.bairro    ?? "";
        document.getElementById("cidade").value    = cliente.cidade    ?? "";
        document.getElementById("estado").value    = cliente.estado    ?? "";

    } catch (erro) {
        console.error("Erro ao carregar dados:", erro);
        alert("Erro ao carregar dados do cliente.");
    }
}

// Salvar alterações
document.getElementById("formDadosPessoais").addEventListener("submit", async (event) => {
    event.preventDefault();

    const clienteID = sessionStorage.getItem("clienteID");

    const dadosAtualizados = {
        nome:     document.getElementById("nome").value,
        email:    document.getElementById("email").value,
        telefone: document.getElementById("telefone").value,
        cep:      document.getElementById("cep").value,
        rua:      document.getElementById("rua").value,
        bairro:   document.getElementById("bairro").value,
        cidade:   document.getElementById("cidade").value,
        estado:   document.getElementById("estado").value
    };

    try {
        const response = await fetch(`http://localhost:8080/clientes/${clienteID}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dadosAtualizados)
        });

        if (response.ok) {
            alert("Dados atualizados com sucesso!");
        } else {
            alert("Erro ao atualizar dados!");
        }

    } catch (erro) {
        console.error("Erro ao salvar:", erro);
        alert("Erro ao conectar com o servidor.");
    }
});

// Inicializar
document.addEventListener("DOMContentLoaded", () => {
    carregarDadosCliente();
});

