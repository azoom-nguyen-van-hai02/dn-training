import { Request, Response } from "express";
import { validateTodo } from "../post";
import { Todo, todos } from "@root/data";

export default function (req: Request, res: Response) {
  const isValidBody = validateTodo(req.body);

  if (!isValidBody) {
    res.status(400).send({
      message: "Invalid body",
    });
  }
  const { description, status, id } = req.body as Todo;
  const todoIndex = todos.findIndex(({ id }) => id === id);

  if (todoIndex < 0) {
    res.status(404).send({
      message: "Not found",
    });
  }

  todos[todoIndex] = { ...todos[todoIndex], description, status };

  return res.status(200).send();
}
