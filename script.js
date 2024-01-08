let divNewList = document.getElementById("listTable");

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

function getListItem(){
    //quero retornar o "listItem" / talvez como uma tabela
    
}

const newL = document.getElementById("newList");
newL.addEventListener("click", newList);

function newList(event){
    event.preventDefault();
    console.log("teste teste");
    //criar uma div
    const divTasks = document.createElement("div");
    
    //pegar o titulo e a data do formulario
    const titleForm = document.getElementById("titulo");
    const dataExpirationForm = document.getElementById("data-prazo");

    let title = document.createElement("p");
    title.textContent = titleForm.value;

    let dataExpiration = document.createElement("p");
    dataExpiration.textContent = dataExpirationForm.value;


    //o botão nova tarefa vai ter o escutador de click para a função newItem
    const newItemButton = document.createElement("button");
    newItemButton.textContent = "Nova Tarefa";
    newItemButton.addEventListener("click", newItem);

    //colocar o titulo e a data do formulario, e o botão nova tarefa na div
    divTasks.appendChild(title);
    divTasks.appendChild(dataExpiration);
    divTasks.appendChild(newItemButton);

    divNewList.appendChild(divTasks);

}

function newItem(event){
    event.preventDefault();
    let divForm = document.getElementById("formNewItem");

    let form = document.createElement("form");

    const buttonOK = document.createElement("button");
    buttonOK.textContent = "OK";
    
    form.appendChild(input);
    form.appendChild(buttonOK);
    divForm.appendChild(form);
    buttonOK.addEventListener("click", (event) => saveItem(event, form));

}


function saveItem(event, form){
    event.preventDefault();
    
    listItem.push(input.value);
    
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

    form.remove();
}

function editItem(){

}

function deleteItem(elemento){

}
