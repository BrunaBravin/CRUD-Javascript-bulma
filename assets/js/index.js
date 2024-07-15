opcao();  
const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sNome = document.querySelector('#m-nome')
const sIdade = document.querySelector('#m-idade')
const sEmail = document.querySelector('#m-email')
const sSenha = document.querySelector('#m-senha')
const sConfirmaSenha = document.querySelector('#m-confirma-senha')
const btnSalvar = document.querySelector('#btnSalvar')
const searchInput = document.querySelector("[data-search]")

let itens
let id


function search() {
  let input = document.getElementById('pesquisa').value
  input= input.toLowerCase();
  let it = getItensBD();
  i = 0;
  let itensNovos = []
  it.forEach(element => {
    if ((element.nome == input) || 
    (element.idade == input) ||
    (element.email == input)){
      itensNovos[i] = element
      i++;
    }
  });
  loadItensPesquisa(itensNovos)
}   


function openModal(edit = false, index = 0) {
  modal.classList.add('is-active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('is-active')
    }
  }

  if (edit) {
    sNome.value = itens[index].nome
    sIdade.value = itens[index].idade
    sEmail.value = itens[index].email
    sSenha.value = itens[index].senha
    sConfirmaSenha.value = itens[index].senha
    id = index
  } else {
    sNome.value = ''
    sIdade.value = ''
    sEmail.value = ''
    sSenha.value = ''
    sConfirmaSenha.value = ''
  }
  
}

function editItem(index) {

  openModal(true, index)
}

function confirmacao(index)
{
var r=confirm("Excluir cadastro?");
if (r==true)
  {
  deleteItem(index);
  }
}

function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.nome}</td>
    <td>${item.idade}</td>
    <td>${item.email}</td>
    <td>${item.senha}</td>
    <td class="acao">
      <button class="button is-warning" onclick="editItem(${index})"></button>
    </td>
    <td class="acao">
      <button class="button is-danger" onclick="confirmacao(${index})"></button>
    </td>
    <td class="acao">
      <input class="selection" name="selection" type="checkbox" value="yes" onclick="opcao()" />
    </td> 
      
  `
  tbody.appendChild(tr)
}

btnSalvar.onclick = e => {
  e.preventDefault();

  if (sNome.value == '' || sIdade.value == '' || sEmail.value == '' || sSenha.value == '' || sConfirmaSenha.value == '') {
    alert('Todos os campos são obrigatórios.')
    return 
  }

  if (sSenha.value !== sConfirmaSenha.value) {
    alert('As senhas não coincidem.')
    return
  }

  if (id !== undefined) {
    itens[id].nome = sNome.value
    itens[id].idade = sIdade.value
    itens[id].email = sEmail.value
    itens[id].senha = sSenha.value
  } else {
    itens.push({'nome': sNome.value, 'idade': sIdade.value, 'email': sEmail.value, 'senha': sSenha.value})
  }

  setItensBD()

  modal.classList.remove('is-active')
  loadItens()
  id = undefined
}

function opcao() {
  if (document.querySelectorAll("input[type=checkbox]:checked").length > 0) 
  {
    document.getElementById("extra")
    .style.display = "inline"
  } else {
      document.getElementById("extra")
      .style.display = "none"
  }
}

function removerItem() {
    let ckList = document.querySelectorAll("input[type=checkbox]:checked");
  
    let indices = [];
    ckList.forEach(function(el) {
      let row = el.parentElement.parentElement;
      let index = Array.from(tbody.children).indexOf(row);
      indices.push(index);
    });
    indices.sort((a, b) => b - a);  
    indices.forEach(index => {
      itens.splice(index, 1);
    });
    setItensBD();
    loadItens();
}

function loadItensPesquisa(itensNovos) {
  if (itensNovos.length == 0){
    loadItens()
    return;
  }
  tbody.innerHTML = ''
  itensNovos.forEach((item, index) => {
    insertItem(item, index)
  })
}

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })
}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()


