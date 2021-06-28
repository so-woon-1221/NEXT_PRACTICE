import React, { useMemo } from "react";
import { TodoType } from "../types/todo";
import TrashCanIcon from "../public/statics/svg/trash_can.svg";
import CheckMarkIcon from "../public/statics/svg/check_mark.svg";

interface IProps {
    todos: TodoType[];
}

const TodoList: React.FC<IProps> = ({ todos }) => {
    type ObjectIndexType = {
        [key: string]: number | undefined;
    };

    const todoColorNums2 = useMemo(() => {
      const colors: ObjectIndexType = {};
      todos.forEach((todo) => {
        const value = colors[todo.color];
        if (!value) {
          colors[`${todo.color}`] = 1;
        } else {
          colors[`${todo.color}`] = value + 1;
        }
      });
      return colors;
    }, [todos]);

    return (
      <div className="w-full">
        <div className="p-4 border-d border-gray-200">
          <p>
            남은 TODO <span className="ml-2">{todos.length}개</span>
          </p>
          <div className="flex items-center">
            {Object.keys(todoColorNums2).map((color, index) => (
              <div className="flex items-center mr-2" key={index}>
                <div className={`w-4 h-4 rounded-full bg-${color}-300`} />
                <p className="ml-2">{todoColorNums2[color]}개</p>
              </div>
            ))}
          </div>
          <ul>
            {todos.map((todo) => (
              <li
                className="flex justify-between items-center w-full h-12 border-b border-gray-200"
                key={todo.id}
              >
                <div className="w-full h-full flex items-center">
                  <div className={`w-3.5 h-full bg-${todo.color}-200`} />
                  <p
                    className={`ml-3.5 flex-1 ${
                      todo.checked ? "text-gray-400 line-through" : ""
                    }`}
                  >
                    {todo.text}
                  </p>
                  <div className="flex mr-3.5">
                    {todo.checked && (
                    <div className="flex items-center">
                      <TrashCanIcon
                        className="m-4 fill-current text-red-600"
                        onClick={() => {
                        }}
                      />
                      <CheckMarkIcon
                        classname="m-4 fill-current text-green-600"
                        onClick={() => {
                        }}
                      />
                    </div>
                    )}
                    {!todo.checked && (
                    <button
                      type="button"
                      className="w-4 h-4 rounded-xl border border-gray-200 bg-transparent outline-none"
                      onClick={() => {
                      }}
                    />
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
};

export default TodoList;
