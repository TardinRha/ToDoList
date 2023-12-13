let divNewList = document.getElementById("listaDeTarefas");

let formNewItem = document.getElementById("FormularioItem");

//const botaoComValor3= document.getElementById("botaoComValor3");
//adicionar nesse botão a capacidade de responder ao evento de click
//botaoComValor3.addEventListener("click", () => logarNumero(3))
// function logarNumero(numero){
//     console.log(numero)
// }
// const funcaoNomeQualquer = () => 3;

const addListButton = document.getElementById("addList");
addListButton.addEventListener("click", saveItem);


let listItem = [];


function getListItem(){
    //quero retornar o "listItem" / talvez como uma tabela
    
}

function newList(){
    //quero que apareça outra div "ListaDeTarefas" no inicio da página
}

function newItem(){
    //
}

function saveItem(event){
    event.preventDefault();
    let input = document.getElementById("inputItem");
    listItem.push(input.value);
    //
    const listDiv = document.getElementById("listTable");
    const divContainer = document.createElement("div")
    const paragrafo = document.createElement("p");
    paragrafo.textContent = input.value;
    divContainer.appendChild(paragrafo)

    const botaoEditar = document.createElement("button");
    botaoEditar.textContent = "Editar";
    botaoEditar.addEventListener("click", () => editItem(paragrafo));
    divContainer.appendChild(botaoEditar);

    const botaoApagar = document.createElement("button");
    botaoApagar.textContent = "Deletar"
    botaoApagar.addEventListener("click", () => deleteItem(divContainer))
    divContainer.appendChild(botaoApagar)

    listDiv.appendChild(divContainer)
    input.value = "";
}

function editItem(){

}

function deleteItem(elemento){

}
