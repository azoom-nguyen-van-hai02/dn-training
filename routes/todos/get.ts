import { TODO_STATUS } from "../../constant/index.ts";
import { todos } from "../../data.ts";
import { Request, Response } from "express";

export default function (req: Request, res: Response) {
  const type = +(req.query.type || -1);

  let returnTodos = [];

  if (Object.values(TODO_STATUS).includes(type)) {
    returnTodos = todos.filter((todo) => todo.status === type);
  } else {
    returnTodos = todos;
  }

  res.status(200).send(returnTodos);
}
