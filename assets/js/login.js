const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))
let attempt = 3;

function validacao(){
    var nome = document.getElementById("nome").value;
    var senha = document.getElementById("senha").value;
    bd = getItensBD();
    console.log((bd.find(bd => bd.nome == nome)));
    if ((bd.find(bd => bd.nome == nome)) && ((bd.find(bd => bd.senha == senha)))){
      alert("Login feito com sucesso!");
      localStorage.setItem('loggedInUser', nome);
      window.location = "home.html"; 
      return false;
    }
    else{
      attempt --;
      alert("Você possui "+attempt+" tentativas restantes;");
      if( attempt == 0){
        document.getElementById("nome").disabled = true;
        document.getElementById("senha").disabled = true;
        document.getElementById("submit").disabled = true;
        return false;
      }
    }
}

