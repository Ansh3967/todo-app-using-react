import { useState } from "react";
import { useTodo } from "../contents";

function TodoForm() {
  const [todo, setTodo] = useState("");
  const { addTodo } = useTodo();
  const submit = (e) => {
    e.preventDefault();
    if (!todo) return;
    addTodo({ todomsg: todo, completed: false });
    setTodo("");
  };
  return (
    <form
      onSubmit={submit}
      className="flex rounded-lg overflow-hidden shadow-sm"
    >
      <input
        type="text"
        placeholder="Add a new task..."
        className="w-full px-4 py-3 text-lg border-2 border-gray-300 focus:border-blue-500 outline-none transition-all duration-200 ease-in-out placeholder-gray-500 text-gray-800"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button
        type="submit"
        className="px-6 py-3 bg-blue-600 text-white text-lg font-semibold hover:bg-blue-700 transition-colors duration-200 ease-in-out shrink-0"
      >
        Add
      </button>
    </form>
  );
}

export default TodoForm;
