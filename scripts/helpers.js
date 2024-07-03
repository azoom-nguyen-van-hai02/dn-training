/** @format */

const getIconPath = (todoStatus) => {
  const isCompleted = todoStatus === TODO_STATUS.complete.value;

  return isCompleted ? CHECK_ICON_RELATIVE_PATH : CIRCLE_ICON_RELATIVE_PATH;
};

function getClassTodoItem(todoStatus) {
  return todoStatus === TODO_STATUS.complete.value ? 'item -done' : 'item';
}

const getIconClassName = (todoStatus) => {
  const isCompleted = todoStatus === TODO_STATUS.complete.value;

  return isCompleted ? 'icon -check' : 'icon -circle';
};

const createElement = (tag = 'div', option) => {
  const element = document.createElement(tag);

  Object.keys(option).forEach((key) => {
    if (key === 'children') {
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
    if (key === 'content') {
      element.textContent = option[key];
      return;
    }

    if (key.startsWith('on')) {
      const { function: func, arguments: args } = option[key];
      const eventName = key.slice(2).toLowerCase();

      element.addEventListener(eventName, (event) =>
        func(...args, event?.target)
      );

      return;
    }

    element.setAttribute(`${key}`, option[key]);
  });

  return element;
};

const isCompletedTodo = ({ status }) => status === TODO_STATUS.complete.value;
