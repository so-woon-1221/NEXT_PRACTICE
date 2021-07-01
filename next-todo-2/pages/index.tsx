import { GetServerSideProps, NextPage } from "next";
import { getTodosApi } from "../lib/api/todo";
import TodoList from "../components/TodoList";
import { TodoType } from "../types/todo";

const todos: TodoType[] = [
  { id: 1, text: "마트가서 장보기", color: "red", checked: false },
  { id: 2, text: "코딩", color: "blue", checked: true },
];

const index: NextPage = () => {
  return <TodoList todos={todos} />;
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const { data } = await getTodosApi();
    console.log(data);
    return { props: {} };
  } catch (e) {
    console.log(e);
    return { props: {} };
  }
};

export default index;
