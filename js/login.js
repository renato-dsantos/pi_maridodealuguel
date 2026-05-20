const formLogin = document.getElementById('formLogin');
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

if (formLogin) {
  formLogin.addEventListener('submit', (event) => {
    event.preventDefault();
    window.location.href = '../index.html';
  });
}

if (formRecuperacao) {
  formRecuperacao.addEventListener('submit', (event) => {
    event.preventDefault();
    alert('Se o e-mail existir na base, enviaremos o link de recuperação.');
    formRecuperacao.reset();
  });
}
