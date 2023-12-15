let divNewList = document.getElementById("listaDeTarefas");

let formNewItem = document.getElementById("FormularioItem");

//const botaoComValor3= document.getElementById("botaoComValor3");
//adicionar nesse botão a capacidade de responder ao evento de click
//botaoComValor3.addEventListener("click", () => logarNumero(3))
// function logarNumero(numero){
//     console.log(numero)
// }
// const funcaoNomeQualquer = () => 3;



let listItem = [];

let input = document.createElement("input");
input.type = "text";

// const buttonOK = document.createElement("button");
// buttonOK.value = "OK";
// buttonOK.addEventListener("click", saveItem);

const newItemButton = document.getElementById("newItem");
newItemButton.addEventListener("click", newItem);


function getListItem(){
    //quero retornar o "listItem" / talvez como uma tabela
    
}

function newList(){
    //quero que apareça outra div "ListaDeTarefas" no inicio da página
}

function newItem(event){
    event.preventDefault();
    let divForm = document.getElementById("formNewItem");

    let form = document.createElement("form");

    const buttonOK = document.createElement("button");
    buttonOK.value = "OK";
    buttonOK.addEventListener("click", saveItem);

    form.appendChild(input);
    form.appendChild(buttonOK);
    divForm.appendChild(form);
    //falta fazer o formulario sumir após o botão ok ser clicado
}


function saveItem(event){
    event.preventDefault();
    //let inputForm = document.getElementById("inputItem");
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
