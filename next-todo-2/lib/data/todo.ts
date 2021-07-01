import { readFileSync } from "fs";
import { TodoType } from "../../types/todo";

const getList = () => {
  const todoBuffer = readFileSync("data/todos.json");
  const todoString = todoBuffer.toString();
  if (!todoString) {
    return [];
  }

  const todos: TodoType[] = JSON.parse(todoString);
  return todos;
};

const exist = ({ id }: { id: number }) => {
  const todos = getList();
  const todo = todos.some((todo) => todo.id === id);
  return todo;
};

export default { getList, exist };
