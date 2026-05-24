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

        // Salva o ID para usar no update
        sessionStorage.setItem("prestadorID", prestador.prestadorId);

        // Preenche o formulário
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

// ✅ DOMContentLoaded no final com delay para garantir que o DOM está pronto
window.addEventListener("load", () => {
    document.querySelector(".tablinks").click();
    carregarDadosPrestador();
});