import { TODO_STATUS } from "constant";
import todos from "data";
export default (req, res) => {
    const type = +(req.query.type || -1);
    let returnTodos = [];
    if (Object.values(TODO_STATUS).includes(type)) {
        returnTodos = todos.filter((todo) => todo.status === type);
    }
    else {
        returnTodos = todos;
    }
    res.status(200).send(returnTodos);
};
