let counter = 0;
let editOpen = false;

//img buttons
const imgEditHeader = document.createElement("img");
imgEditHeader.src = "images/edit.png";
imgEditHeader.alt = "Editar";
imgEditHeader.className = "img-button-edit-header";

const imgEditTask = document.createElement("img");
imgEditTask.src = "images/edit.png";
imgEditTask.alt = "Editar";
imgEditTask.className = "img-button-task";

const imgDeleteTask = document.createElement("img");
imgDeleteTask.src = "images/delete.png";
imgDeleteTask.alt = "Deletar";
imgDeleteTask.className = "img-button-task";

//fim img buttons

class ListaDeTarefas {
    constructor(title, deadline) {
        this.title = title;
        this.deadline = deadline;
        this.tasks = [];
    }
}

let lists = [];

const buttonNewList = document.getElementById("button-newList");
buttonNewList.addEventListener("click", generateFormAddNewList);

function generateFormAddNewList() {
    const divHeader = document.getElementById("header");

    const divForm = document.createElement("div");
    divForm.id = "divForm";
    divForm.className = "div-form";

    const formCreateList = document.createElement("form");
    formCreateList.className = "form-new-list";

    const inputTitle = document.createElement("input");
    inputTitle.type = "text";
    inputTitle.id = "title";
    const labelTitle = document.createElement("label");
    labelTitle.textContent = "Título:";
    labelTitle.setAttribute("for", "title");
    labelTitle.appendChild(inputTitle);

    const inputDeadline = document.createElement("input");
    inputDeadline.type = "date";
    inputDeadline.id = "deadline";
    const labelDeadline = document.createElement("label");
    labelDeadline.textContent = "Data Final:";
    labelDeadline.setAttribute("for", "deadline");
    labelDeadline.appendChild(inputDeadline);

    const buttonCreateNewList = document.createElement("button");
    buttonCreateNewList.textContent = "OK";
    buttonCreateNewList.className = "button-form-new-list";
    buttonCreateNewList.addEventListener("click", (ev) => {
        addNewList(ev, inputTitle, inputDeadline);
        divForm.remove(divHeader);
    });

    formCreateList.appendChild(labelTitle);
    formCreateList.appendChild(labelDeadline);
    formCreateList.appendChild(buttonCreateNewList);

    divForm.appendChild(formCreateList);

    divHeader.appendChild(divForm);
}

function addNewList(ev, title, deadline) {
    ev.preventDefault();

    const validateTitle = validateText(title.value);
    const validateDate = validateDeadline(deadline.value);

    if (!validateTitle || !validateDate) {
        return;
    }

    const newList = new ListaDeTarefas(title.value, deadline.value);
    lists.push(newList);

    title.value = "";
    deadline.value = "";

    saveInLocalStorage();
    generateListElements();
}

function generateListElements() {
    const bodyToDo = document.getElementById("body-todo");
    bodyToDo.innerHTML = "";

    for (let i = 0; i < lists.length; i++) {
        const imgEditHeaderClone = imgEditHeader.cloneNode(true);

        const divToDo = document.createElement("div");
        divToDo.id = `list_${counter}`;
        divToDo.className = "div-todo";
        counter++;

        const divListHeader = document.createElement("div");
        divListHeader.id = "divListHeader";


        const divInfosList = document.createElement("div");
        divInfosList.id = "divInfosList";
        divInfosList.className = "div-infos-list";

        let title = document.createElement("p");
        title.id = `t${i}`;
        title.textContent = lists[i].title;

        let deadline = document.createElement("p");
        deadline.id = `d${i}`;
        deadline.textContent = lists[i].deadline;

        divInfosList.appendChild(title);
        divInfosList.appendChild(deadline);

        const buttonEditCabecalho = document.createElement("button");
        buttonEditCabecalho.appendChild(imgEditHeaderClone);
        buttonEditCabecalho.className = "button-edit-header";
        buttonEditCabecalho.addEventListener("click", (event) => editCabecalhoList(event, i, title, deadline, divListHeader, divInfosList, buttonEditCabecalho));

        divListHeader.appendChild(divInfosList);
        divListHeader.appendChild(buttonEditCabecalho);

        const divButtonsTodo = document.createElement("div");
        const buttonDeleteList = document.createElement("button");
        buttonDeleteList.textContent = "Apagar Lista";
        buttonDeleteList.className = "button-delete-task";
        buttonDeleteList.addEventListener("click", (event) => deleteList(event, i));

        const buttonNewTask = document.createElement("button");
        buttonNewTask.textContent = "Nova Tarefa";
        buttonNewTask.className = "button-new-task";
        buttonNewTask.addEventListener("click", (event) => newTask(event, i, divToDo));

        divButtonsTodo.appendChild(buttonNewTask);
        divButtonsTodo.appendChild(buttonDeleteList);

        const divTasks = document.createElement("div");
        divTasks.id = "divTasks";
        divTasks.className = "div-tasks";

        divToDo.appendChild(divButtonsTodo);
        divToDo.appendChild(divListHeader);
        divToDo.appendChild(divTasks);

        if (lists[i].tasks) {
            for (let j = 0; j < lists[i].tasks.length; j++) {
                const imgEditClone = imgEditTask.cloneNode(true);
                const imgDeleteClone = imgDeleteTask.cloneNode(true);

                const divTask = document.createElement('div');
                divTask.id = `${divToDo.id}_task${j}`;
                divTask.className = "div-task";

                let task = document.createElement('p');
                task.textContent = lists[i].tasks[j];

                const buttonEditTask = document.createElement('button');
                buttonEditTask.className = "button-task";
                buttonEditTask.appendChild(imgEditClone);
                buttonEditTask.addEventListener("click", (event) => editTask(event, i, j, divTask, task, divButtonsTask));

                const buttonDeleteTask = document.createElement('button');
                buttonDeleteTask.className = "button-task";
                buttonDeleteTask.appendChild(imgDeleteClone);
                buttonDeleteTask.addEventListener("click", (event) => {
                    event.preventDefault();
                    deleteTask(event, i, j);
                    generateListElements()
                });

                const divButtonsTask = document.createElement("div");
                divButtonsTask.appendChild(buttonEditTask);
                divButtonsTask.appendChild(buttonDeleteTask);

                divTask.appendChild(task);
                divTask.appendChild(divButtonsTask);


                divTasks.appendChild(divTask);
            }
        }

        bodyToDo.appendChild(divToDo);
    }
}

function editCabecalhoList(event, indexList, title, deadline, divListHeader, divInfosList, buttonEditCabecalho) {
    event.preventDefault();

    if (editOpen) {
        return;
    }


    divInfosList.remove();
    buttonEditCabecalho.remove();

    const divEditHeaderList = document.createElement("div");
    divEditHeaderList.id = "divEditHeader";

    const formEditHeaderList = document.createElement("form");
    formEditHeaderList.id = "formEditHeaderList";

    const inputEditTitle = document.createElement("input");
    inputEditTitle.type = "text";
    inputEditTitle.value = title.textContent;

    const inputEditDeadline = document.createElement("input");
    inputEditDeadline.type = "date";
    inputEditDeadline.value = deadline.textContent;

    const buttonSaveEditHeaderList = document.createElement("button");
    buttonSaveEditHeaderList.textContent = "OK";
    buttonSaveEditHeaderList.addEventListener("click", (event) => {
        event.preventDefault();
        saveEditHeader(event, indexList, inputEditTitle, inputEditDeadline);
        generateListElements();
    });

    formEditHeaderList.appendChild(inputEditTitle);
    formEditHeaderList.appendChild(inputEditDeadline);
    formEditHeaderList.appendChild(buttonSaveEditHeaderList);

    divEditHeaderList.appendChild(formEditHeaderList);

    divListHeader.appendChild(divEditHeaderList);

    editOpen = true;
}

function saveEditHeader(event, indexList, inputEditTitle, inputEditDeadline) {
    const validateTitle = validateText(inputEditTitle.value);

    if (!validateTitle) {
        editOpen = false;
        return;
    }

    lists[indexList].title = inputEditTitle.value;
    lists[indexList].deadline = inputEditDeadline.value

    saveInLocalStorage();
    editOpen = false;
}

function deleteList(event, indexList) {
    event.preventDefault();
    lists.splice(indexList, 1);

    saveInLocalStorage();
    generateListElements();
}

function newTask(event, index, divToDo) {
    event.preventDefault();
    console.log(editOpen);
    if (editOpen) {
        return;
    }

    let form = document.createElement("form");
    form.id = "formNewTask";
    form.className = "form-new-task";

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

function saveTask(event, input, index) {
    event.preventDefault();

    const validate = validateText(input.value);

    if (!validate) {
        editOpen = false;
        return;
    }

    lists[index].tasks.push(input.value);

    saveInLocalStorage();

    editOpen = false;
}

function editTask(event, indexList, indexTask, divTask, taskToDelete, divButtonsTaskToDelete) {
    event.preventDefault();

    if (editOpen) {
        return;
    }

    taskToDelete.remove();
    divButtonsTaskToDelete.remove();

    const formEditTask = document.createElement("form");
    formEditTask.id = "formEditTask";
    formEditTask.className = "form-edit-task";

    const inputEdit = document.createElement("input");
    inputEdit.type = "text";
    inputEdit.value = lists[indexList].tasks[indexTask];

    const buttonSaveEdit = document.createElement("button");
    buttonSaveEdit.textContent = "Salvar";
    buttonSaveEdit.addEventListener("click", (event) => {
        event.preventDefault();
        saveEdit(event, indexList, indexTask, inputEdit);
        generateListElements();
    });

    formEditTask.appendChild(inputEdit);
    formEditTask.appendChild(buttonSaveEdit);

    divTask.appendChild(formEditTask);

    editOpen = true;
}

function saveEdit(event, indexList, indexTask, inputEdit) {
    const validate = validateText(inputEdit.value);

    if (!validate) {
        editOpen = false;
        return;
    }

    lists[indexList].tasks[indexTask] = inputEdit.value;

    saveInLocalStorage();

    editOpen = false;
}

function deleteTask(event, indexList, indexTask) {
    lists[indexList].tasks.splice(indexTask, 1);

    saveInLocalStorage();
}

const buttonClearAll = document.getElementById("button-clearAll");
buttonClearAll.addEventListener("click", clearAll);

function clearAll() {
    localStorage.removeItem("todo");
    lists = [];
    generateListElements();
}

function saveInLocalStorage() {
    let listsJSON = JSON.stringify(lists);
    localStorage.setItem("todo", listsJSON);
}

function getInLocalStorage() {
    let listsJSON = localStorage.getItem("todo");
    let listsOBJ = JSON.parse(listsJSON);
    if (listsJSON === null) {
        lists = [];
        return;
    }
    lists = listsOBJ;
}

function validateText(input) {
    const valueWithoutSpaces = input.trim();

    if (valueWithoutSpaces === '') {
        return false;
    }
    return true;
}

function validateDeadline(input) {
    //cria um objeto Date a partir da string da data
    const inputDate = new Date(input);
    inputDate.setHours(inputDate.getHours() + 3);
    //cria um objeto Date para a data atual
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0)

    if (inputDate >= currentDate) {
        return true;
    }

    return false;
}

getInLocalStorage();
generateListElements();