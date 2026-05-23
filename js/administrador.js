function openTabs(evt, tabsName) {
// variavel
  var i, tabcontent, tablinks;

  

// atribuindo o conteudo na variavel
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  
 // mostra os elemtno class="tablinks" e remove com o"active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the link that opened the tab
  document.getElementById(tabsName).style.display = "block";
  evt.currentTarget.className += " active";  

}

// Quando a página carregar, abre a primeira aba automaticamente
window.addEventListener("DOMContentLoaded", () => {
  const firstTab = document.getElementsByClassName("tablinks")[0];
  if (firstTab) {
    firstTab.click(); // Simula o clique no primeiro botão
  }
});

// Buscar e renderizar clientes
async function carregarClientes() {
    try {
        const response = await fetch("http://localhost:8080/clientes");

        if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);

        const clientes = await response.json();
        const tbody = document.querySelector("#tabelaClientes tbody");
        tbody.innerHTML = "";

        clientes.forEach(cliente => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${cliente.clienteID ?? "-"}</td>
                <td>${cliente.nome ?? "-"}</td>
                <td>${cliente.email ?? "-"}</td>
                <td>${cliente.telefone ?? "-"}</td>
                <td>${cliente.cidade ?? "-"}</td>
                <td>${cliente.estado ?? "-"}</td>
                <td>
                    <button class="btn-excluir" onclick="excluirCliente(${cliente.clienteID})">Excluir</button>
                </td>
            `;
            tbody.appendChild(tr);
        });

    } catch (erro) {
        console.error("Erro ao carregar clientes:", erro);
        alert("Não foi possível carregar os clientes. Verifique a API.");
    }
}

// Excluir cliente
async function excluirCliente(id) {
    if (!confirm(`Deseja realmente excluir o cliente ${id}?`)) return;

    try {
        const response = await fetch(`http://localhost:8080/clientes/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) throw new Error(`Erro ao excluir: ${response.status}`);

        alert("Cliente excluído com sucesso!");
        carregarClientes(); // Recarrega a tabela
    } catch (erro) {
        console.error("Erro ao excluir cliente:", erro);
        alert("Erro ao excluir o cliente.");
    }
}

// Buscar e renderizar prestadores
async function carregarPrestadores() {
    try {
        const response = await fetch("http://localhost:8080/prestadores");

        if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);

        const prestadores = await response.json();
        const tbody = document.querySelector("#tabelaPrestador tbody");
        tbody.innerHTML = "";

        prestadores.forEach(prestador => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${prestador.prestadorId ?? "-"}</td>
                <td>${prestador.nome ?? "-"}</td>
                <td>${prestador.email ?? "-"}</td>
                <td>${prestador.telefone ?? "-"}</td>
                <td>${prestador.servicos ?? "-"}</td>
                <td>
                    <button class="btn-excluir" onclick="excluirPrestador(${prestador.prestadorId})">Excluir</button>
                </td>
            `;
            tbody.appendChild(tr);
        });

    } catch (erro) {
        console.error("Erro ao carregar prestadores:", erro);
        alert("Não foi possível carregar os prestadores. Verifique a API.");
    }
}

// Excluir prestador
async function excluirPrestador(id) {
    if (!confirm(`Deseja realmente excluir o prestador ${id}?`)) return;

    try {
        const response = await fetch(`http://localhost:8080/prestadores/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) throw new Error(`Erro ao excluir: ${response.status}`);

        alert("Prestador excluído com sucesso!");
        carregarPrestadores();
    } catch (erro) {
        console.error("Erro ao excluir prestador:", erro);
        alert("Erro ao excluir o prestador.");
    }
}

// Inicializar ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
    carregarClientes();
    carregarPrestadores();
});


