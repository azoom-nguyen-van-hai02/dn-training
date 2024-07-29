import { TODO_STATUS } from "./constant/index.ts";

export type Todo = {
  id?: number;
  description: string;
  status: number;
};

function generateTodos(): Todo[] {
  const todos: Todo[] = [];
  for (let i = 1; i <= 10; i++) {
    const todo: Todo = {
      id: i,
      description: `Todo item ${i}`,
      status: i % 2 === 0 ? TODO_STATUS.done : TODO_STATUS.todo, // Alternate between done and todo
    };
    todos.push(todo);
  }
  return todos;
}

export const todos = generateTodos();
