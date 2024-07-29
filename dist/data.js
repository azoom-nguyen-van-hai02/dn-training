import { TODO_STATUS } from "constant";
function generateTodos() {
    const todos = [];
    for (let i = 1; i <= 10; i++) {
        const todo = {
            id: i,
            description: `Todo item ${i}`,
            status: i % 2 === 0 ? TODO_STATUS.done : TODO_STATUS.todo, // Alternate between done and todo
        };
        todos.push(todo);
    }
    return todos;
}
const todos = generateTodos();
export default todos;
