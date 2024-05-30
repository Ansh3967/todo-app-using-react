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
    <form onSubmit={submit} className="flex">
      <input
        type="text"
        placeholder="Write Todo..."
        className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button
        type="submit"
        className="rounded-r-lg px-3 py-1 bg-green-400 text-white shrink-0"
      >
        Add
      </button>
    </form>
  );
}

export default TodoForm;
