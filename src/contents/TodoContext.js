import { useContext, createContext } from "react";

export const TodoContext = createContext({
  todos: [{ id: 1, todomsg: "something", completed: false }],
  addTodo: (todo) => {},
  updateTodo: (id, todo) => {},
  delTodo: (id) => {},
  toggleComplete: (id) => {},
});

export const useTodo = () => useContext(TodoContext);

export const TodoProvider = TodoContext.Provider;
