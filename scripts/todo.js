/** @format */

class Todo {
  constructor({
    id,
    content = 'Work',
    type = TODO_TYPE.personal.value,
    status = TODO_STATUS.incomplete.value,
  } = {}) {
    this.id = id || randomId();
    this.content = content;
    this.type = type;
    this.status = status;
  }

  getTypeText() {
    return (
      Object.values(TODO_TYPE).find(({ value }) => value === this.type)?.text ||
      ''
    );
  }

  updateStatus(status) {
    this.status = status;
  }

  completeTodo() {
    this.status = TODO_STATUS.complete.value;
  }

  incompleteTodo() {
    this.status = TODO_STATUS.incomplete.value;
  }
}

class TodoList {
  constructor(initialList = []) {
    this.values = [];

    initialList.forEach((todo) => {
      const newTodo = todo instanceof Todo ? todo : new Todo(todo);
      this.addTodo(newTodo);
    });
  }

  addTodo(todo) {
    const cloneTodo = new Todo({ ...todo });
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

  removeById(id) {
    this.values = this.values.filter((todo) => todo.id !== id);
  }

  updateStatus(todoIndex, status) {
    if (todoIndex < 0 || todoIndex > this.values.length) {
      return -1;
    }

    this.values[todoIndex].updateStatus(status);
  }
}
