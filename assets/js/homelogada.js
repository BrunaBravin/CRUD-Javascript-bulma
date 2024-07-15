document.addEventListener('DOMContentLoaded', function() {
    // Recupere o nome do usuário do localStorage
    const userName = localStorage.getItem('loggedInUser');

    // Verifique se o nome do usuário existe
    if (userName) {
      // Exiba o nome do usuário na página
      document.getElementById('user-name').textContent = userName;
    } else {
      // Se o usuário não estiver logado, redirecione para a página de login
      window.location.href = 'login.html';
    }
     // Adicione um evento de clique ao botão de logout
     document.getElementById('logout').addEventListener('click', function() {
        // Remova o nome do usuário do localStorage
        localStorage.removeItem('loggedInUser');
      });
  });