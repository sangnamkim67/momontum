const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");

const TODO_LS = "toDos";

let toDos = [];
function saveToDos(data) {
    localStorage.setItem(TODO_LS, data);
}
function paintToDoList(text) {
    const li = document.createElement("li");
    const button = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    button.style.border = "none";
    button.style.background = "transparent";
    button.innerText = "❌";
    button.addEventListener("click", deleteToDo);
    span.innerText = " " + text;
    li.appendChild(button);
    li.appendChild(span);
    li.id = newId;
    li.setAttribute("style", "margin : 10px 0");
    toDoList.appendChild(li);

    const toDo = {
        id: newId,
        toDo: text,
    };
    toDos.push(toDo);
    const data = JSON.stringify(toDos);
    saveToDos(data);
}
function deleteToDo(e) {
    const button = e.target;
    const li = button.parentNode;
    li.remove();
    const cleanToDos = toDos.filter(function (toDo) {
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    const data = JSON.stringify(toDos);
    saveToDos(data);
}
function handleSubmit(e) {
    e.preventDefault();
    const currentValue = toDoInput.value;
    paintToDoList(currentValue);
    // toDos에 등록
    toDoInput.value = "";
}

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODO_LS);

    if (loadedToDos !== null) {
        toDoForm.setAttribute("style", "display : block");
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function (toDo) {
            paintToDoList(toDo.toDo);
        });
    }
}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();
