const submitForm = document.getElementById('main-box__userName');
// const submitInput = submitForm.querySelector('input');
const todoDiv = document.querySelector('.main-box__todo');
const todoUsername = todoDiv.querySelector('h1');

function submitUsernameDisplay() {
  todoDiv.classList.add('display-none');
  submitForm.classList.remove('display-none');
}

function todoDisplay(userName) {
  submitForm.classList.add('display-none');
  todoDiv.classList.remove('display-none');
  // todoUsername.innerText = `Hello ${userName}`;
}

function saveUsername(userName) {
  localStorage.setItem('userName', userName);

  todoDisplay(userName);
}

function submitUsername(event) {
  event.preventDefault();

  const userName = submitInput.value;
  saveUsername(userName);
}

function userNameInit() {
  const localUsername = localStorage.getItem('userName');

  if (!localUsername) {
    submitUsernameDisplay();
    submitForm.addEventListener('submit', submitUsername);
  } else {
    todoDisplay(localUsername);
  }
}

userNameInit();
