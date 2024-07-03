const TodoType = {
  personal: {
    value: 1,
    text: "Personal",
  },
  professional: {
    value: 2,
    text: "Professional",
  },
};

const randomId = () => Math.random().toString().slice(2, 16);

const TodoStatus = {
  complete: {
    value: 1,
  },
  incomplete: {
    value: 0,
  },
};

class Todo {
  #id = null;
  #content = "Work";
  #type = null;
  #status = null;

  constructor({
    id,
    content = "Work",
    type = TodoType.personal.value,
    status = TodoStatus.incomplete.value,
  }) {
    this.id = id || randomId();
    this.content = content;
    this.type = type;
    this.status = status;
  }

  get() {
    const { id, content, type, status } = this;

    return { id, content, type, status };
  }

  getTypeText() {
    return (
      Object.values(TodoType).find(({ value }) => value === this.type)?.text ||
      ""
    );
  }

  updateStatus(status) {
    this.status = status;
  }

  completeTodo() {
    this.status = TodoStatus.complete.value;
  }

  incompleteTodo() {
    this.status = TodoStatus.incomplete.value;
  }
}

const tryCloneObject = (object) => {
  try {
    const clone = JSON.parse(JSON.stringify(object));
    return clone;
  } catch (error) {
    return null;
  }
};

class TodoList {
  #values;

  constructor(initialList = []) {
    this.values = [];

    initialList.forEach((todo) => {
      const newTodo = todo instanceof Todo ? todo : new Todo(todo);
      this.addTodo(newTodo);
    });
  }

  addTodo(todo) {
    const cloneTodo = new Todo(todo.get());
    this.values.push(cloneTodo);

    return this.values.length;
  }

  removeTodo(index) {
    if (index < 0 || index > this.values.length) {
      return -1;
    }

    this.values.splice(index, 1);
    return this.values.length;
  }

  removeByid(id) {
    this.values = this.values.filter((todo) => todo.id !== id);
  }

  updateStatus(todoIndex, status) {
    if (todoIndex < 0 || todoIndex > this.values.length) {
      return -1;
    }

    this.values[todoIndex].updateStatus(status);
  }
}

const defaultTodoList = [
  {
    id: 1,
    type: TodoType.personal.value,
    status: TodoStatus.complete.value,
    content: "Personal Work No. 1",
  },
  {
    id: 2,
    type: TodoType.personal.value,
    content: "Personal Work No. 2",
  },
  {
    id: 3,
    type: TodoType.personal.value,
    content: "Personal Work No. 3",
  },
  {
    id: 4,
    type: TodoType.personal.value,
    status: TodoStatus.complete.value,
    content: "Personal Work No. 4",
  },
  {
    id: 5,
    type: TodoType.personal.value,
    content: "Personal Work No. 5",
  },
  {
    id: 1,
    type: TodoType.professional.value,
    status: TodoStatus.complete.value,
    content: "Professional Work No. 1",
  },
  {
    id: 2,
    type: TodoType.professional.value,
    content: "Professional Work No. 2",
  },
  {
    id: 3,
    type: TodoType.professional.value,
    content: "Professional Work No. 3",
  },
  {
    id: 4,
    type: TodoType.professional.value,
    status: TodoStatus.complete.value,
    content: "Professional Work No. 4",
  },
  {
    id: 5,
    type: TodoType.professional.value,
    content: "Professional Work No. 5",
  },
];

const createElement = (tag = "div", option) => {
  const element = document.createElement(tag);

  Object.keys(option).forEach((key) => {
    if (key === "children") {
      const children = option[key];

      if (Array.isArray(children)) {
        children.forEach((child) => {
          const { tag, ...restOption } = child;
          const childElement = createElement(tag, restOption);

          element.appendChild(childElement);
        });
      }

      return;
    }
    if (key === "content") {
      element.innerText = option[key];
      return;
    }

    element.setAttribute(`${key}`, option[key]);
  });

  return element;
};

const CHECK_ICON_RELATIVE_PATH = "./images/check.svg";
const CIRCLE_ICON_RELATIVE_PATH = "./images/circle.svg";
const DELETE_ICON_RELATIVE_PATH = "./images/delete.svg";

const getIconPath = (todoStatus) => {
  const isCompleted = todoStatus === TodoStatus.complete.value;

  return isCompleted ? CHECK_ICON_RELATIVE_PATH : CIRCLE_ICON_RELATIVE_PATH;
};

const getIconClassName = (todoStatus) => {
  const isCompleted = todoStatus === TodoStatus.complete.value;

  return isCompleted ? "icon -check" : "icon -circle";
};

const getCurrentTodoList = (type) =>
  type === TodoType.personal.value ? personalTodoList : professionalTodoList;

const clickTodoIcon = (imageElement, id, type) => {
  const todoList = getCurrentTodoList(type);
  const todoIndex = getCurrentTodoList(type).values.findIndex(
    (todo) => todo.id === id && todo.type === type
  );

  if (todoIndex < 0) return;

  const todo = todoList.values[todoIndex];
  const { complete, incomplete } = TodoStatus;
  todo.status =
    todo.status === complete.value ? incomplete.value : complete.value;

  todoList.updateStatus(todoIndex, todo.status);

  imageElement.setAttribute("src", getIconPath(todo.status));
  imageElement.setAttribute("class", getIconClassName(todo.status));

  const todoElement = document.querySelector(
    `.list > .item:nth-child(${todoIndex + 1})`
  );
  if (todoElement) {
    todoElement.setAttribute("class", getClassTodoItem(todo.status));
  }
};

const findTodoIndex = (list, todoType, id) =>
  list.findIndex((todo) => todo.type === todoType && todo.id === id);

const removeTodoElement = (todoIndex) => {
  const todoElement = document.querySelector(
    `.list > .item:nth-child(${todoIndex + 1})`
  );

  if (todoElement) {
    todoElement.remove();
  }
};

const onClickDelete = (todoType, id) => {
  const currentList =
    todoType == TodoType.personal.value
      ? personalTodoList
      : professionalTodoList;

  const todoIndex = findTodoIndex(currentList.values, todoType, id);

  if (todoIndex < 0) return;

  const { content } = currentList.values[todoIndex];
  const isConfirm = confirm(`${content} will be deleted. Are you sure?`);

  if (!isConfirm) return;

  currentList.removeTodo(todoIndex);
  removeTodoElement(todoIndex);
};

const getTodoIconProperty = (todo = new Todo()) => {
  const className = getIconClassName(todo.status);
  const imageSource = getIconPath(todo.status);

  return {
    tag: "img",
    class: className,
    src: imageSource,
    onClick: `clickTodoIcon(event.srcElement, ${todo.id}, ${todo.type})`,
  };
};

function capitalize(str) {
  if (str.length === 0) {
    return str;
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function appendNewTodo(todo, parentElement) {
  const todoElement = createTodoElement(todo);

  parentElement.appendChild(todoElement);
}

function getTodoContentElementProperties(todo = new Todo()) {
  return {
    tag: "p",
    class: "content",
    content: todo.content,
  };
}

function getClassTodoItem(todoStatus) {
  return todoStatus === TodoStatus.complete.value ? "item -done" : "item";
}

function createTodoElement(todo = new Todo()) {
  const imageElementProperties = getTodoIconProperty(todo);
  const contentElementProperties = getTodoContentElementProperties(todo);
  const deleteIconProperties = {
    tag: "img",
    class: "icon -delete",
    src: DELETE_ICON_RELATIVE_PATH,
    onClick: `onClickDelete(${todo.type}, ${todo.id}, '${todo.content}')`,
  };
  const className = getClassTodoItem(todo.status);

  return createElement("div", {
    class: className,
    children: [
      imageElementProperties,
      contentElementProperties,
      deleteIconProperties,
    ],
  });
}

function renderTodoList(
  todoList = [],
  parentElement = document.createElement("div")
) {
  if (!parentElement) return;

  todoList.forEach((todo) => appendNewTodo(todo, parentElement));
}

let currentTodoType = TodoType.personal.value;
const todoList = new TodoList(defaultTodoList);
const listTodoElement = document.querySelector(".container.-todo > .list");
const personalTodoList = new TodoList(
  todoList.values.filter((todo) => todo.type === TodoType.personal.value)
);
const professionalTodoList = new TodoList(
  todoList.values.filter((todo) => todo.type === TodoType.professional.value)
);
const personalButton = document.querySelector("button.-personal");
const professionalButton = document.querySelector("button.-professional");
const addButton = document.querySelector(".add > .button.-append");
const inputElement = document.querySelector(".add > input");

if (listTodoElement) {
  renderTodoList(personalTodoList.values, listTodoElement);
}

const isCompletedTodo = ({ status }) => status === TodoStatus.complete.value;

function clearAllCompletedTodo() {
  const todoList = getCurrentTodoList(currentTodoType);

  const completedTodoList = todoList.values.filter(isCompletedTodo);

  completedTodoList.forEach(({ id }) => {
    const todoIndex = todoList.values.findIndex((todo) => todo.id === id);

    todoList.removeByid(id);
    removeTodoElement(todoIndex);
  });
}

function switchStatusType(type) {
  currentTodoType = type;
  reRenderByNewType(currentTodoType);
}

function reRenderByNewType(type) {
  listTodoElement.innerHTML = "";

  if (type === TodoType.personal.value) {
    personalButton.classList.add("-active");
    professionalButton.classList.remove("-active");
    renderTodoList(personalTodoList.values, listTodoElement);

    return;
  }

  personalButton.classList.remove("-active");
  professionalButton.classList.add("-active");
  renderTodoList(professionalTodoList.values, listTodoElement);
}

let newTodoContent = "";

function onInputSearch(event) {
  const input = event.target.value;
  const oldInput = newTodoContent;
  newTodoContent = input;

  if (oldInput && newTodoContent) {
    return;
  }
  if (!input) {
    addButton?.setAttribute("disabled", true);
  } else {
    addButton?.removeAttribute("disabled");
  }
}

function addTodo() {
  const currentList = getCurrentTodoList();

  const todo = new Todo({
    content: newTodoContent,
    type: currentTodoType,
  });

  currentList.addTodo(todo);
  appendNewTodo(todo, listTodoElement);
  inputElement.value = null;
  addButton.setAttribute("disabled", true);
  newTodoContent = "";
}
