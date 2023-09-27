const TODO_SAVE_KEY = 'todoList';
let todoArr = [];
const todo = {
  todoInput: document.querySelector('#main-box__submit input'),
  todoForm: document.querySelector('#main-box__submit'),
  todoListBox: document.querySelector('.todo-list__box'),
  todoList: document.querySelector('.todo-list__todos'),
  todoDefaultImg: document.querySelector('.main-box__todolist img'),
  todoStatus: document.querySelector('.todo-list__status-col:nth-child(2)'),
  todoDltBtn: document.querySelector('.todo-list__delete-btn'),
  todoDltAll: document.querySelector('.todo-list__dlt-all'),
  resetComp: document.querySelector('.reset'),
  todoColor: [
    'color1',
    'color2',
    'color3',
    'color4',
    'color5',
    'color6',
    'color7',
    'color8',
    'color9',
    'color10',
    'color11',
    'color12',
    'color13',
  ],
  saveToDo: function (event) {
    event.preventDefault();

    const todoName = todo.todoInput.value;
    const todoObj = {
      todoName: todoName,
      todoDone: 0,
      id: Date.now(),
    };
    todoArr.push(todoObj);
    localStorage.setItem(TODO_SAVE_KEY, JSON.stringify(todoArr));
    todo.firstToDoCheck();
    todo.paintToDo(todoObj);
    todo.todoInput.value = '';
  },
  paintToDo: function (todoObj) {
    const todoDiv = document.createElement('div');
    todoDiv.className = 'todo-list__todo';

    const todoColor = document.createElement('div');
    const ranColor = todo.randomColor();
    todoColor.className = `todo-color ${ranColor}`;

    const todoName = document.createElement('div');
    todoName.className = 'todo-name';
    const todoSpan = document.createElement('span');
    todoSpan.innerText = todoObj.todoName;
    todoName.appendChild(todoSpan);

    const todoBtn = document.createElement('div');
    todoBtn.className = 'todo-btn';

    // mode에 따라 삭제/토글 display
    let toggleHtml;
    let dltHtml;
    // if (
    //   todo.todoDltBtn.querySelector('span:nth-child(1)').classList.length === 1
    // ) {
    //   toggleHtml = `<div class="todo-btn__todo-toggle"><input type="checkbox" id=${todoObj.id} class="toggleChk" value=${todoObj.todoDone} hidden /><label for=${todoObj.id} class="toggleSwitch"><span class="toggleButton"></span></label></div>`;
    //   dltHtml = `<div class="todo-btn__dlt-each display-none"><i class="fa-solid fa-trash-can"></i></div>`;
    // } else {
    //   toggleHtml = `<div class="todo-btn__todo-toggle  display-none"><input type="checkbox" id=${todoObj.id} class="toggleChk" value=${todoObj.todoDone} hidden /><label for=${todoObj.id} class="toggleSwitch"><span class="toggleButton"></span></label></div>`;
    //   dltHtml = `<div class="todo-btn__dlt-each"><i class="fa-solid fa-trash-can"></i></div>`;
    // }

    todoBtn.innerHTML = toggleHtml + dltHtml;
    todoDiv.appendChild(todoColor);
    todoDiv.appendChild(todoName);
    todoDiv.appendChild(todoBtn);
    // todo.todoList.appendChild(todoDiv);

    if (todoObj.todoDone === 1) {
      todo.togglePaint(todoObj.id, 1);
    }

    // 토글 클릭 이벤트
    // todoDiv
    //   .querySelector('.todo-btn__todo-toggle input')
    //   .addEventListener('click', todo.toggleCheck);

    // todoDiv
    //   .querySelector('.todo-btn__dlt-each i')
    //   .addEventListener('click', todo.dltEach);

    // todo.updateState();
  },
  randomColor: function () {
    const randomNum = Math.floor(Math.random() * 13);
    return todo.todoColor[randomNum];
  },
  readToDo: function () {
    const savedJson = JSON.parse(localStorage.getItem(TODO_SAVE_KEY));
    if (savedJson && savedJson.length !== 0) {
      todoArr = savedJson;
      todoArr.forEach(todo.paintToDo);
    } else {
      todo.todoListBox.classList.add('display-none');
      todo.todoDefaultImg.classList.remove('display-none');
    }
  },
  firstToDoCheck: function () {
    if (todoArr && todoArr.length !== 0) {
      todo.todoListBox.classList.remove('display-none');
      todo.todoDefaultImg.classList.add('display-none');
    } else {
      todo.todoListBox.classList.add('display-none');
      todo.todoDefaultImg.classList.remove('display-none');
    }
  },
  updateState: function () {
    const total = todoArr.length;
    const checked = todoArr.filter((todo) => todo.todoDone === 1);
    todo.todoStatus.innerText = `${checked.length} / ${total}`;
  },
  toggleCheck: function (event) {
    const tf = parseInt(event.target.value);
    if (tf) {
      event.target.value = '0';
    } else {
      event.target.value = '1';
    }
    todo.togglePaint(parseInt(event.target.id), parseInt(event.target.value));
    todo.toggleSave(event.target);
    todo.updateState();
  },
  togglePaint: function (targetId, value) {
    const idx = todoArr.findIndex((obj) => obj.id === targetId) + 1;
    const box = document.querySelector(`.todo-list__todo:nth-child(${idx})`);
    const name = document.querySelector(
      `.todo-list__todo:nth-child(${idx}) .todo-name span`
    );
    const input = document.querySelector(
      `.todo-list__todo:nth-child(${idx}) .todo-btn input`
    );
    input.click();

    if (value) {
      box.classList.add('todo-list__todo-done');
      name.classList.add('todo-name__done');
    } else {
      box.classList.remove('todo-list__todo-done');
      name.classList.remove('todo-name__done');
    }
  },
  toggleSave: function (target) {
    const arrTarget = todoArr.filter((arr) => String(arr.id) === target.id);
    arrTarget[0].todoDone = parseInt(target.value);
    localStorage.setItem(TODO_SAVE_KEY, JSON.stringify(todoArr));
  },
  changeMode: function (e) {
    e.preventDefault();

    const todoToggleBox = document.querySelectorAll('.todo-btn__todo-toggle');
    const todoDltEachBox = document.querySelectorAll('.todo-btn__dlt-each');

    const dltSpan = e.submitter.querySelector('span:nth-child(1)');
    const backSpan = e.submitter.querySelector('span:nth-child(2)');

    if (dltSpan.classList.length === 1) {
      todoToggleBox.forEach((element) => element.classList.add('display-none'));
      todoDltEachBox.forEach((element) =>
        element.classList.remove('display-none')
      );
      dltSpan.classList.add('display-none');
      backSpan.classList.remove('display-none');
    } else {
      todoToggleBox.forEach((element) =>
        element.classList.remove('display-none')
      );
      todoDltEachBox.forEach((element) =>
        element.classList.add('display-none')
      );
      dltSpan.classList.remove('display-none');
      backSpan.classList.add('display-none');
    }
  },
  dltEach: function (e) {
    const comId = e.target.parentElement.parentElement.querySelector(
      'div:first-child input'
    );
    const todoComp = e.target.parentElement.parentElement.parentElement;
    todoArr = todoArr.filter((obj) => obj.id !== parseInt(comId.id));
    localStorage.setItem(TODO_SAVE_KEY, JSON.stringify(todoArr));
    todoComp.remove();

    if (todoArr.length === 0) {
      todo.todoListBox.classList.add('display-none');
      todo.todoDefaultImg.classList.remove('display-none');
    }
  },
  removeAll: function () {
    const todolists = document.querySelectorAll('.todo-list__todo');
    todolists.forEach((x) => x.remove());
    localStorage.removeItem(TODO_SAVE_KEY);
    todoArr.length = 0;
    // todo.todoListBox.classList.add('display-none');
    // todo.todoDefaultImg.classList.remove('display-none');
  },
  resetAll: function () {
    todo.removeAll();
    localStorage.removeItem('userName');
    userNameInit();
  },
};

// todo.readToDo();
todo.todoForm.addEventListener('submit', todo.saveToDo);

const todoToggles = document.querySelectorAll('.todo-btn__todo-toggle input');
todoToggles.forEach((element) => {
  element.addEventListener('click', todo.toggleCheck);
});

// todo.todoListBox.addEventListener('submit', todo.changeMode);
// todo.todoDltAll.addEventListener('click', todo.removeAll);
todo.resetComp.addEventListener('click', todo.resetAll);
