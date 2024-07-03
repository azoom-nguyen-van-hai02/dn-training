/** @format */

// import {
//   TODO_TYPE,
//   TODO_STATUS,
//   DEFAULT_TODO_LIST,
//   DELETE_ICON_RELATIVE_PATH,
// } from './constants.js';
// import { Todo, TodoList } from './todo.js';
// import {
//   createElement,
//   getIconClassName,
//   getIconPath,
//   getClassTodoItem,
//   isCompletedTodo,
// } from './helpers.js';

let newTodoContent = '';
let currentTodoType = TODO_TYPE.personal.value;
const todoList = new TodoList(DEFAULT_TODO_LIST);
const listTodoElement = document.querySelector('.container.-todo > .list');
const personalTodoList = new TodoList(
  todoList.values.filter((todo) => todo.type === TODO_TYPE.personal.value)
);
const professionalTodoList = new TodoList(
  todoList.values.filter((todo) => todo.type === TODO_TYPE.professional.value)
);
let currentTodoList = personalTodoList;

const personalButton = document.querySelector('button.-personal');
const professionalButton = document.querySelector('button.-professional');
const addButton = document.querySelector('.add > .button.-append');
const inputElement = document.querySelector('.add > input');
const clearCompletedTodoButton = document.querySelector('.action > .button');

inputElement?.addEventListener('input', onInputSearch);
addButton?.addEventListener('click', addTodo);
personalButton?.addEventListener('click', () =>
  switchStatusType(TODO_TYPE.personal.value)
);
professionalButton?.addEventListener('click', () =>
  switchStatusType(TODO_TYPE.professional.value)
);
clearCompletedTodoButton?.addEventListener('click', clearAllCompletedTodo);

function getCurrentTodoList(type) {
  return type === TODO_TYPE.personal.value
    ? personalTodoList
    : professionalTodoList;
}

function clickTodoIcon({ id }, imageElement) {
  const todoIndex = currentTodoList.values.findIndex((todo) => todo.id === id);

  if (todoIndex < 0 || !imageElement) return;

  const todo = currentTodoList.values[todoIndex];
  const { complete, incomplete } = TODO_STATUS;
  todo.status =
    todo.status === complete.value ? incomplete.value : complete.value;

  todoList.updateStatus(todoIndex, todo.status);

  imageElement.setAttribute('src', getIconPath(todo.status));
  imageElement.setAttribute('class', getIconClassName(todo.status));

  const todoElement = document.querySelector(
    `.list > .item:nth-child(${todoIndex + 1})`
  );
  if (todoElement) {
    todoElement.setAttribute('class', getClassTodoItem(todo.status));
  }
}

const clearTodoEventListeners = (todoElement) => {
  const prependIconNode = todoElement.querySelector('.icon:first-child');
  prependIconNode?.removeEventListener('click', clickTodoIcon);

  const appendIconNode = todoElement.querySelector('.icon.-delete');
  appendIconNode?.removeEventListener('click', onClickDelete);
};

function removeTodoElement(todoIndex) {
  const todoElement = document.querySelector(
    `.list > .item:nth-child(${todoIndex + 1})`
  );

  if (todoElement) {
    clearTodoEventListeners(todoElement);
    todoElement.remove();
  }
}

function onClickDelete({ type, id } = {}) {
  const currentList =
    type == TODO_TYPE.personal.value ? personalTodoList : professionalTodoList;

  const todoIndex = currentList.values.findIndex((todo) => todo.id === id);

  if (todoIndex < 0) return;

  const { content } = currentList.values[todoIndex];
  const isConfirm = confirm(`${content} will be deleted. Are you sure?`);

  if (!isConfirm) return;

  currentList.removeTodo(todoIndex);
  removeTodoElement(todoIndex);
}

function getTodoIconProperty(todo) {
  const { status } = todo;
  const className = getIconClassName(status);
  const imageSource = getIconPath(status);

  return {
    tag: 'img',
    class: className,
    src: imageSource,
    onClick: {
      function: clickTodoIcon,
      arguments: [todo],
    },
  };
}

function getTodoContentElementProperties(todo) {
  return {
    tag: 'p',
    class: 'content',
    content: todo.content,
  };
}

function createTodoElement(todo = new Todo()) {
  const imageElementProperties = getTodoIconProperty(todo);
  const contentElementProperties = getTodoContentElementProperties(todo);
  const className = getClassTodoItem(todo.status);
  const deleteIconProperties = {
    tag: 'img',
    class: 'icon -delete',
    src: DELETE_ICON_RELATIVE_PATH,
    onClick: {
      function: onClickDelete,
      arguments: [todo],
    },
  };

  return createElement('div', {
    class: className,
    children: [
      imageElementProperties,
      contentElementProperties,
      deleteIconProperties,
    ],
  });
}

function appendNewTodo(todo, parentElement) {
  const todoElement = createTodoElement(todo);

  parentElement.appendChild(todoElement);
}

function renderTodoList(
  todoList = [],
  parentElement = document.createElement('div')
) {
  if (!parentElement) return;

  todoList.forEach((todo) => appendNewTodo(todo, parentElement));
}

if (listTodoElement) {
  renderTodoList(personalTodoList.values, listTodoElement);
}

function clearAllCompletedTodo() {
  const completedTodoList = currentTodoList.values.filter(isCompletedTodo);

  completedTodoList.forEach(({ id }) => {
    const todoIndex = currentTodoList.values.findIndex(
      (todo) => todo.id === id
    );

    currentTodoList.removeById(id);
    removeTodoElement(todoIndex);
  });
}

function switchStatusType(type) {
  currentTodoType = type;
  currentTodoList = getCurrentTodoList(type);
  reRenderByNewType(currentTodoType);
}

const clearAllListenerOnTodoItem = () => {
  listTodoElement.childNodes.forEach(clearTodoEventListeners);
};

function reRenderByNewType(type) {
  clearAllListenerOnTodoItem();
  listTodoElement.innerHTML = '';

  if (type === TODO_TYPE.personal.value) {
    personalButton.classList.add('-active');
    professionalButton.classList.remove('-active');
    renderTodoList(personalTodoList.values, listTodoElement);

    return;
  }

  personalButton.classList.remove('-active');
  professionalButton.classList.add('-active');
  renderTodoList(professionalTodoList.values, listTodoElement);
}

function onInputSearch(event) {
  const input = event.target.value;
  const oldInput = newTodoContent;
  newTodoContent = input;

  if (oldInput && newTodoContent) {
    return;
  }
  if (!input) {
    addButton?.setAttribute('disabled', true);
  } else {
    addButton?.removeAttribute('disabled');
  }
}

function addTodo() {
  const isExistInCurrentList = currentTodoList.values.some(
    (todo) => todo.content === newTodoContent
  );

  if (isExistInCurrentList) {
    return;
  }

  const todo = new Todo({
    content: newTodoContent,
    type: currentTodoType,
  });

  newTodoContent = '';
  currentTodoList.addTodo(todo);
  appendNewTodo(todo, listTodoElement);

  inputElement.value = null;
  addButton.setAttribute('disabled', true);
}
