let counter = 0;
let editOpen = false;

//img buttons
const imgEditTitle = document.createElement("img");
imgEditTitle.src = "images/edit.png";
imgEditTitle.alt = "Editar";

const imgEditDeadline = document.createElement("img");
imgEditDeadline.src = "images/edit.png";
imgEditDeadline.alt = "Editar";

const imgEditTask = document.createElement("img");
imgEditTask.src = "images/edit.png";
imgEditTask.alt = "Editar";

//fim img buttons

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
    
    const validateTitle = validateText(title.value);
    const validateDate = validateDeadline(deadline.value);

    if(!validateTitle || !validateDate){
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

            let divTitle = document.createElement("div");
            let title = document.createElement("p");
            title.textContent = lists[i].title;
            const buttonEditTitle = document.createElement("button");
            buttonEditTitle.appendChild(imgEditTitle);
            buttonEditTitle.addEventListener("click", (event) => editTitleList(event, i, divTitle));
            divTitle.appendChild(title);
            divTitle.appendChild(buttonEditTitle);

            let divDeadline = document.createElement("div");
            let deadline = document.createElement("p");
            deadline.textContent = lists[i].deadline;
            const buttonEditDeadline = document.createElement("button");
            buttonEditDeadline.appendChild(imgEditDeadline);
            buttonEditDeadline.addEventListener("click", (event) => editDeadlineList(event, i, divDeadline));
            divDeadline.appendChild(deadline);
            divDeadline.appendChild(buttonEditDeadline);

            const buttonDeleteList = document.createElement("button");
            buttonDeleteList.textContent = "Apagar Lista";
            buttonDeleteList.addEventListener("click", (event) => deleteList(event, i));

            const buttonNewTask = document.createElement("button");
            buttonNewTask.textContent = "Nova Tarefa";
            buttonNewTask.addEventListener("click", (event) => newTask(event, i, divToDo));
        
            divToDo.appendChild(divTitle);
            divToDo.appendChild(divDeadline);
            divToDo.appendChild(buttonDeleteList);
            divToDo.appendChild(buttonNewTask);

            if(lists[i].tasks){
                for(let j = 0; j < lists[i].tasks.length; j++){
                    const imgClone = imgEditTask.cloneNode(true);
                    const divTask = document.createElement('div');
                    divTask.id = `${divToDo.id}_task${j}`;

                    let task = document.createElement('p');
                    task.textContent = lists[i].tasks[j];

                    const buttonEditTask = document.createElement('button');
                    buttonEditTask.appendChild(imgClone);
                    buttonEditTask.addEventListener("click", (event) => editTask(event, i, j, divTask));

                    const buttonDeleteTask = document.createElement('button');
                    buttonDeleteTask.textContent = "x";
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

function editTitleList(event, indexList, divTitle){
    event.preventDefault();
    
    if(editOpen){
        return;
    }

    let divEditTitle = document.createElement("div");
    divEditTitle.id = "divEditTitle";

    let formEditTitle = document.createElement("form");
    formEditTitle.id = "formEditTitle";

    let inputEditTitle = document.createElement("input");
    inputEditTitle.type = "text";
    inputEditTitle.value = lists[indexList].title;

    const buttonSaveEditTitle = document.createElement("button");
    buttonSaveEditTitle.textContent = "OK";
    buttonSaveEditTitle.addEventListener("click", (event) => {
        event.preventDefault();
        saveEditTitle(event, indexList, inputEditTitle);
        generateListElements();
    });

    formEditTitle.appendChild(inputEditTitle);
    formEditTitle.appendChild(buttonSaveEditTitle);

    divEditTitle.appendChild(formEditTitle);

    divTitle.appendChild(divEditTitle);

    editOpen = true;
}

function saveEditTitle(event, indexList, inputEditTitle){
    const validateTitle = validateText(inputEditTitle.value);

    if(!validateTitle){
        editOpen = false;
        return;
    }

    lists[indexList].title = inputEditTitle.value;

    saveInLocalStorage();
    editOpen = false;
}

function editDeadlineList(event, indexList, divDeadline){
    event.preventDefault();
    
    if(editOpen){
        return;
    }

    let formEditDeadline = document.createElement("form");
    formEditDeadline.id = "formEditTitle";

    let inputEditDeadline = document.createElement("input");
    inputEditDeadline.type = "date";
    inputEditDeadline.value = lists[indexList].deadline;

    const buttonSaveEditDeadline = document.createElement("button");
    buttonSaveEditDeadline.textContent = "OK";
    buttonSaveEditDeadline.addEventListener("click", (event) => {
        event.preventDefault();
        saveEditDeadline(event, indexList, inputEditDeadline);
        generateListElements();
    });

    formEditDeadline.appendChild(inputEditDeadline);
    formEditDeadline.appendChild(buttonSaveEditDeadline);

    divDeadline.appendChild(formEditDeadline);

    editOpen = true;
}

function saveEditDeadline(event, indexList, inputEditDeadline){
    const validateDate = validateDeadline(inputEditDeadline.value);
    if(!validateDate){
        editOpen = false;
        return;
    }

    lists[indexList].deadline = inputEditDeadline.value;

    saveInLocalStorage();
    editOpen = false;
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

    const validate = validateText(input.value);

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
    const validate = validateText(inputEdit.value);

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

function clearAll(){
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

function validateText(input){
    const valueWithoutSpaces = input.trim();

    if(valueWithoutSpaces === ''){
        return false;
    }
    return true;
}

function validateDeadline(input){
    //cria um objeto Date a partir da string da data
    const inputDate = new Date(input);
    inputDate.setHours(inputDate.getHours() + 3);
    //cria um objeto Date para a data atual
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0)

    if(inputDate >= currentDate){
        return true;
    }

    return false;
}

getInLocalStorage();
generateListElements()