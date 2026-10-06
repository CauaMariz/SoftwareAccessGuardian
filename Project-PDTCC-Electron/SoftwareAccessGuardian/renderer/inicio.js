//nas linhas abaixo, selecionamos o formulario de login e o elemento onde vamos mostrar o resultado do login.
const formLogin = document.querySelector('.form-login-content-page');
const resultadoLogin = document.querySelector('#resultadoLogin');

//adicionamos um listener para o evento de submit do formulario. Quando o formulario for enviado, a funcao assincrona sera executada.
formLogin.addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = document.getElementById('emailUser').value;
  const senha = document.getElementById('senhaUser').value;

  //chamamos a funcao loginUser do preload.js, passando o email e senha como parametros. A funcao retorna uma promessa, que resolvemos com await.
  const result = await window.accessGuardian.loginUser(email, senha);

  //verificamos se o login foi bem sucedido. Se sim, mostramos uma mensagem de sucesso e os dados do gestor. Se nao, mostramos uma mensagem de erro.
  if (result.success) {
      alert(`Login realizado! Bem-vindo, ${result.user.nome_seguranca}`);

        window.location.href = '../pages/tela_do_seguranca.html';
  }
  else{
    alert('Email ou senha incorretos.');
  }
});