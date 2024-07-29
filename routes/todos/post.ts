import { TODO_STATUS } from "@root/constant";
import { Todo, todos } from "@root/data";
import { Request, Response } from "express";

export default function (req: Request, res: Response) {
  const isValidBody = validateTodo(req.body);

  if (!isValidBody) {
    res.status(400).send({
      message: "Invalid body",
    });
  }

  const id = Number((Math.random() * 1000).toFixed(0));
  const { description, status } = req.body as Todo;
  const todo = {
    id,
    description,
    status,
  };
  todos.push(todo);

  res.status(201).send(todo);
}

export const validateTodo = (payload: Todo) => {
  const { description, status } = payload;

  return description && Object.values(TODO_STATUS).includes(status);
};
