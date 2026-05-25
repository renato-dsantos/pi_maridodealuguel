document.getElementById("formLogin").addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    if (!email || !senha) {
        alert("Preencha o e-mail e a senha!");
        return;
    }

    try {
        const response = await fetch("http://localhost:8080/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, senha })
        });

        const acesso = await response.text();

        if (response.ok) {
            sessionStorage.setItem("emailLogado", email);
            
            if (acesso === "cliente") {
                const resCliente = await fetch(`http://localhost:8080/clientes/email/${email}`);
                const cliente = await resCliente.json();
                sessionStorage.setItem("cliente", JSON.stringify(cliente));

        window.location.href = "../pages/cliente.html";
            } else if (acesso === "prestador") {
                window.location.href = "../pages/prestador.html";
            } else if (acesso === "administrador") {
                window.location.href = "../pages/administrador.html";
            } else {
                alert("Tipo de acesso desconhecido: " + acesso);
            }
        } else {
            alert("E-mail ou senha incorretos!");
        }

    } catch (erro) {
        console.error("Erro ao fazer login:", erro);
        alert("Erro ao conectar com o servidor.");
    }
});


const formRecuperacao = document.getElementById('formRecuperacao');
const toggleRecuperacao = document.getElementById('toggleRecuperacao');
const painelRecuperacao = document.getElementById('painelRecuperacao');
const emailRecuperacao = document.getElementById('emailRecuperacao');

if (toggleRecuperacao && painelRecuperacao) {
  toggleRecuperacao.addEventListener('click', () => {
    const expanded = toggleRecuperacao.getAttribute('aria-expanded') === 'true';
    toggleRecuperacao.setAttribute('aria-expanded', String(!expanded));
    painelRecuperacao.hidden = expanded;

    if (!expanded && emailRecuperacao) {
      emailRecuperacao.focus();
    }
  });
}


if (formRecuperacao) {
  formRecuperacao.addEventListener('submit', (event) => {
    event.preventDefault();
    alert('Se o e-mail existir na base, enviaremos o link de recuperação.');
    formRecuperacao.reset();
  });
}

