document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('formCadastro');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const idade = document.getElementById('idade').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const confirmaSenha = document.getElementById('confirma-senha').value;

    if (senha !== confirmaSenha) {
      alert('As senhas não coincidem.');
      return;
    }

    const novoFuncionario = { nome, idade, email, senha };
    
    let itens = getItensBD();
    itens.push(novoFuncionario);
    setItensBD(itens);

    form.reset();

    window.location.href = 'login.html';
  });

  const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? [];
  const setItensBD = (itens) => localStorage.setItem('dbfunc', JSON.stringify(itens));
});