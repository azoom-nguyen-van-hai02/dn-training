import { todos } from "@root/data";
import { Request, Response } from "express";

export default function (req: Request, res: Response) {
  const todoId = +req.params.id;
  const todoIndex = todos.findIndex(({ id }) => id === todoId);

  if (todoIndex < 0) {
    res.status(404).send({
      message: "Not found",
    });
  }

  todos.splice(todoIndex, 1);

  return res.status(200).send();
}
