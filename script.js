let counter = 0;
let editOpen = false;

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
    //criar uma div
    const divTasks = document.createElement("div");
    divTasks.id = "list" + (counter);
    counter++;
    
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
    newItemButton.addEventListener("click", (event) => newItem(event, divTasks.id));

    //colocar o titulo e a data do formulario, e o botão nova tarefa na div
    divTasks.appendChild(title);
    divTasks.appendChild(dataExpiration);
    divTasks.appendChild(newItemButton);

    divNewList.appendChild(divTasks);

}

function newItem(event, divTaskId){
    event.preventDefault();
    let divForm = document.getElementById(divTaskId);

    let form = document.createElement("form");

    const buttonOK = document.createElement("button");
    buttonOK.textContent = "OK";
    
    form.appendChild(input);
    form.appendChild(buttonOK);
    divForm.appendChild(form);
    buttonOK.addEventListener("click", (event) => saveItem(event, form, divTaskId));

}

let counterDivItem = 0;
function saveItem(event, form, divTaskId){
    event.preventDefault();
    
    //listItem.push(input.value);
    
    const listDiv = document.getElementById(divTaskId);
    const divItem = document.createElement("div");
    divItem.id = "divItem" + counter + "_" + counterDivItem;
    counterDivItem++;

    const paragrafo = document.createElement("p");
    paragrafo.id = "par";
    paragrafo.textContent = input.value;
    divItem.appendChild(paragrafo);

    const botaoEditar = document.createElement("button");
    botaoEditar.textContent = "Editar";
    botaoEditar.addEventListener("click", (event) => editItem(event, divTaskId, divItem.id, paragrafo.id));
    divItem.appendChild(botaoEditar);

    const botaoApagar = document.createElement("button");
    botaoApagar.textContent = "Deletar"
    botaoApagar.addEventListener("click", (event) => deleteItem(event, divTaskId, divItem.id));
    divItem.appendChild(botaoApagar);

    listDiv.appendChild(divItem);
    input.value = "";

    form.remove();
}

function editItem(event, divTaskId, divItemId, paragrafoId){
    event.preventDefault();
    
    if(editOpen){
        return;
    }

    const divTask = document.getElementById(divTaskId);
    const divItem = document.getElementById(divItemId);
    let paragrafo = divItem.querySelector('p');

    let divEdit = document.createElement("div");
    divEdit.id = "divEdit";

    let formEdit = document.createElement("form");
    formEdit.id = "formEdit";

    let input = document.createElement("input");
    input.type = "text";
    input.value = paragrafo.textContent;

    const saveEditButton = document.createElement("button");
    saveEditButton.textContent = "Salvar";
    saveEditButton.addEventListener("click", (event) => {
        event.preventDefault();
        saveEdit(event, divItemId, input, divEdit.id);
    });

    formEdit.appendChild(input);
    formEdit.appendChild(saveEditButton);

    divEdit.appendChild(formEdit);

    divItem.appendChild(divEdit);
    editOpen = true;
}

function saveEdit(event, divItemId, input, divEditId){
    event.preventDefault();

    const divItem = document.getElementById(divItemId);
    let paragrafo = divItem.querySelector('p');

    paragrafo.textContent = input.value;

    let divEditToRemove = document.getElementById(divEditId);
    divItem.remove(divEditToRemove);
    //saveInLocalStorage();

    editOpen = false;
}

function deleteItem(event, divTaskId, divItemId){
    event.preventDefault();
    const divTask = document.getElementById(divTaskId);
    const divItem = document.getElementById(divItemId);
    divTask.removeChild(divItem);
    //saveInLocalStorage();
}
