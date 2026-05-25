function openTabs(evt, tabsName) {
    var i, tabcontent, tablinks;

    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById(tabsName).style.display = "block";
    evt.currentTarget.className += " active";
}

// Carrega dados do prestador logado
async function carregarDadosPrestador() {
    const email = sessionStorage.getItem("emailLogado");

    if (!email) {
        alert("Sessão expirada, faça login novamente!");
        window.location.href = "../pages/login.html";
        return;
    }

    try {
        const response = await fetch(`http://localhost:8080/prestadores/email/${email}`);
        if (!response.ok) throw new Error("Erro ao buscar prestador");

        const prestador = await response.json();

        sessionStorage.setItem("prestadorID", prestador.prestadorId);

        document.getElementById("nome").value      = prestador.nome      ?? "";
        document.getElementById("email").value     = prestador.email     ?? "";
        document.getElementById("telefone").value  = prestador.telefone  ?? "";
        document.getElementById("servicos").value  = prestador.servicos  ?? "";
        document.getElementById("descricao").value = prestador.descricao ?? "";

    } catch (erro) {
        console.error("Erro ao carregar dados:", erro);
        alert("Erro ao carregar dados do prestador.");
    }
}

// Salvar alterações
document.getElementById("formDadosPrestador").addEventListener("submit", async (event) => {
    event.preventDefault();

    const prestadorID = sessionStorage.getItem("prestadorID");

    const dadosAtualizados = {
        nome:      document.getElementById("nome").value,
        email:     document.getElementById("email").value,
        telefone:  document.getElementById("telefone").value,
        servicos:  document.getElementById("servicos").value,
        descricao: document.getElementById("descricao").value
    };

    try {
        const response = await fetch(`http://localhost:8080/prestadores/${prestadorID}`, {
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

// Carregar serviços do prestador
async function carregarServicos() {
    const prestadorID = sessionStorage.getItem("prestadorID");
    if (!prestadorID) return;

    try {
        const response = await fetch(`http://localhost:8080/servicos/prestador/${prestadorID}`);
        if (!response.ok) throw new Error("Erro ao buscar serviços");

        const servicos = await response.json();
        const tbody = document.querySelector("#tabelaPrestador tbody");

        if (servicos.length === 0) {
            tbody.innerHTML = '<tr><td colspan="8">Nenhum serviço solicitado.</td></tr>';
            return;
        }

        tbody.innerHTML = servicos.map(s => `
            <tr>
                <td>${s.cliente.nome}</td>
                <td>${s.cliente.email}</td>
                <td>${s.cliente.telefone}</td>
                <td>${s.tipo}</td>
                <td>${s.data}</td>
                <td>${s.descricao ?? ''}</td>
                <td>
                    <button class="btn-aceitar" onclick="aceitarServico(${s.id})">Aceitar</button>
                </td>
                <td>
                    <button class="btn-recusar" onclick="recusarServico(${s.id})">Recusar</button>
                </td>
            </tr>
        `).join('');

    } catch (erro) {
        console.error("Erro ao carregar serviços:", erro);
    }
}

function aceitarServico(id) {
    alert(`Serviço aceito! O cliente será notificado.`);
}

async function recusarServico(id) {
    if (!confirm("Deseja recusar este serviço?")) return;

    try {
        const response = await fetch(`http://localhost:8080/servicos/${id}`, {
            method: "DELETE"
        });

        if (response.ok) {
            alert("Serviço recusado. O cliente será notificado.");
            carregarServicos();
        } else {
            alert("Erro ao recusar serviço.");
        }
    } catch (erro) {
        console.error("Erro ao recusar:", erro);
        alert("Erro ao conectar com o servidor.");
    }
}

// DOMContentLoaded
window.addEventListener("load", () => {
    document.querySelector(".tablinks").click();
    carregarDadosPrestador().then(() => carregarServicos());
});