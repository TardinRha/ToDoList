let counter = 0;
let editOpen = false;

class ListaDeTarefas{
    constructor(title, deadline){
        this.title = title;
        this.deadline = deadline;
        this.tasks = [];
    }
}

let lists = [];

const buttonNewList = document.getElementById("button-newList");
buttonNewList.addEventListener("click", addNewList);

function addNewList(event){
    event.preventDefault();

    let title = document.getElementById("title");
    let deadline = document.getElementById("deadline");
    
    const validate = validateInput(title.value);

    if(!validate){
        return;
    }

    const newList = new ListaDeTarefas(title.value, deadline.value);
    lists.push(newList);

    title.value = "";
    deadline.value = "";

    saveInLocalStorage();
    generateListElements();
}


function generateListElements(){
    let bodyToDo = document.getElementById("body-todo");
    bodyToDo.innerHTML = "";
    
     if(lists){
        for(let i = 0; i < lists.length; i++){
            const divToDo = document.createElement("div");
            divToDo.id = `list_${counter}`;
            counter++;

            let title = document.createElement("p");
            title.textContent = lists[i].title;

            let dataExpiration = document.createElement("p");
            dataExpiration.textContent = lists[i].deadline;

            const buttonDeleteList = document.createElement("button");
            buttonDeleteList.textContent = "Apagar Lista";
            buttonDeleteList.addEventListener("click", (event) => deleteList(event, i));

            const buttonNewTask = document.createElement("button");
            buttonNewTask.textContent = "Nova Tarefa";
            buttonNewTask.addEventListener("click", (event) => newTask(event, i, divToDo));
        
            divToDo.appendChild(title);
            divToDo.appendChild(dataExpiration);
            divToDo.appendChild(buttonDeleteList);
            divToDo.appendChild(buttonNewTask);

            if(lists[i].tasks){
                for(let j = 0; j < lists[i].tasks.length; j++){
                const divTask = document.createElement('div');
                divTask.id = `${divToDo.id}_task${j}`;

                let task = document.createElement('p');
                task.textContent = lists[i].tasks[j];

                const buttonEditTask = document.createElement('button');
                buttonEditTask.textContent = "Editar";
                buttonEditTask.addEventListener("click", (event) => editTask(event, i, j, divTask));

                const buttonDeleteTask = document.createElement('button');
                buttonDeleteTask.textContent = "Deletar";
                buttonDeleteTask.addEventListener("click", (event) => {
                    event.preventDefault();
                    deleteTask(event, i, j);
                    generateListElements()});

                divTask.appendChild(task);
                divTask.appendChild(buttonEditTask);
                divTask.appendChild(buttonDeleteTask);

                divToDo.appendChild(divTask);
                }
            }
        
            bodyToDo.appendChild(divToDo);
        }
     }
}

function deleteList(event, indexList){
    event.preventDefault();
    lists.splice(indexList,1);

    saveInLocalStorage();
    generateListElements();
}

function newTask(event, index, divToDo){
    event.preventDefault();
    if(editOpen){
        return;
    }

    let form = document.createElement("form");
    form.id = "form-new-task";
    
    let input = document.createElement("input");
    input.type = "text";
    
    const buttonOK = document.createElement("button");
    buttonOK.textContent = "OK";
    
    buttonOK.addEventListener("click", (event) => {
        event.preventDefault();
        saveTask(event, input, index, form);
        generateListElements();
    });
    
    form.appendChild(input);
    form.appendChild(buttonOK);
    divToDo.appendChild(form);    
    
    editOpen = true;
}

function saveTask(event, input, index){
    event.preventDefault();

    const validate = validateInput(input.value);

    if(!validate){
        editOpen = false;
        return;
    }

    lists[index].tasks.push(input.value);

    saveInLocalStorage();

    editOpen = false;
}

function editTask(event, indexList, indexTask, divTask){
    event.preventDefault();
    
    if(editOpen){
        return;
    }

    let divEditTask = document.createElement("div");
    divEditTask.id = "divEditTask";

    let formEdit = document.createElement("form");
    formEdit.id = "formEdit";

    let inputEdit = document.createElement("input");
    inputEdit.type = "text";
    inputEdit.value = lists[indexList].tasks[indexTask];

    const buttonSaveEdit = document.createElement("button");
    buttonSaveEdit.textContent = "Salvar";
    buttonSaveEdit.addEventListener("click", (event) => {
        event.preventDefault();
        saveEdit(event, indexList, indexTask, inputEdit, divEditTask);
        generateListElements();
    });

    formEdit.appendChild(inputEdit);
    formEdit.appendChild(buttonSaveEdit);

    divEditTask.appendChild(formEdit);

    divTask.appendChild(divEditTask);

    editOpen = true;
}

function saveEdit(event, indexList, indexTask, inputEdit){
    const validate = validateInput(inputEdit.value);

    if(!validate){
        editOpen = false;
        return;
    }

    lists[indexList].tasks[indexTask] = inputEdit.value;

    saveInLocalStorage();

    editOpen = false;
}

function deleteTask(event, indexList, indexTask){
    lists[indexList].tasks.splice(indexTask, 1);

    saveInLocalStorage();
}

const buttonClearAll = document.getElementById("button-clearAll");
buttonClearAll.addEventListener("click", clearAll);

function clearAll(){ //método ainda não usado
    localStorage.removeItem("todo");
    generateListElements()
}

function saveInLocalStorage(){
    let listsJSON = JSON.stringify(lists);
    localStorage.setItem("todo", listsJSON);
}

function getInLocalStorage(){
    let listsJSON = localStorage.getItem("todo");
    let listsOBJ = JSON.parse(listsJSON);
    if(listsJSON === null){
        lists = [];
        return;
    }
    lists = listsOBJ;
}

function validateInput(input){
    const valueWithoutSpaces = input.trim();

    if(valueWithoutSpaces === ''){
        return false;
    }
    return true;
}

getInLocalStorage();
generateListElements()