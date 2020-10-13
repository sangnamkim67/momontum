const form = document.querySelector(".js-form");
const input = form.querySelector("input");
const greeting = document.querySelector(".js-greetings");

const in_toDoForm = document.querySelector(".js-toDoForm");

const USER_LS = "currentUser";
const SHOWING_CN = "showing";

function saveName(text) {
    localStorage.setItem(USER_LS, text);
}
// 사용자 정보 입력
function askForName() {
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        const currentValue = input.value;
        paintGreeting(currentValue);
        saveName(currentValue);
    });
}
// 사용자 정보 출력
function paintGreeting(text) {
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    const date = new Date();
    const hour = date.getHours();

    if (hour < 12) {
        greeting.innerText = `Good Morning ${text} :)`;
    } else if (hour <= 18 && hour > 12) {
        greeting.innerText = `Good Afternoon ${text} :)`;
    } else {
        greeting.innerText = `Good Night ${text} :)`;
    }
    in_toDoForm.classList.add(SHOWING_CN);
}
function loadName() {
    const currentUser = localStorage.getItem(USER_LS);

    if (currentUser === null) {
        // input
        askForName();
    } else {
        // Hello username
        paintGreeting(currentUser);
    }
}

function init() {
    loadName();
}

init();
