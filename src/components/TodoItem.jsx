import { useState } from "react";
import { useTodo } from "../contents";

function TodoItem({ todo }) {
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [todoMsg, setTodoMsg] = useState(todo.todomsg);
  const { updateTodo, delTodo, toggleComplete } = useTodo();

  const editTodo = () => {
    updateTodo(todo.id, { ...todo, todomsg: todoMsg });
    setIsTodoEditable(false);
  };
  const toggle = () => {
    toggleComplete(todo.id);
  };
  return (
    <div
      className={`flex items-center border border-gray-200 rounded-xl p-4 gap-x-4 shadow-md transition-all duration-300 ${
        todo.completed ? "bg-green-100 border-green-300" : "bg-white"
      }`}
    >
      <input
        type="checkbox"
        className="cursor-pointer h-6 w-6 accent-blue-600"
        checked={todo.completed}
        onChange={toggle}
      />
      <input
        type="text"
        className={`flex-grow text-lg py-1 px-2 border outline-none bg-transparent rounded-md transition-all duration-200 ${
          isTodoEditable
            ? "border-gray-400 focus:border-blue-500"
            : "border-transparent"
        } ${todo.completed ? "line-through text-gray-500" : "text-gray-800"}`}
        value={todoMsg}
        onChange={(e) => setTodoMsg(e.target.value)}
        readOnly={!isTodoEditable}
      />
      {/* Edit, Save Button */}
      <button
        className="inline-flex w-10 h-10 rounded-full text-xl border border-gray-300 justify-center items-center bg-gray-100 hover:bg-gray-200 transition-colors duration-200 shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => {
          if (todo.completed) return;

          if (isTodoEditable) {
            editTodo();
          } else setIsTodoEditable((prev) => !prev);
        }}
        disabled={todo.completed}
      >
        {isTodoEditable ? "💾" : "✍️"}
      </button>
      {/* Delete Todo Button */}
      <button
        className="inline-flex w-10 h-10 rounded-full text-xl border border-gray-300 justify-center items-center bg-gray-100 hover:bg-red-500 hover:text-white transition-colors duration-200 shrink-0"
        onClick={() => {
          // Only allow deletion of completed tasks, as per original logic
          if (todo.completed) {
            delTodo(todo.id);
          } else {
            // Optionally, allow deletion of uncompleted tasks, or add a confirmation.
            // For now, sticking to original logic of only deleting completed tasks.
            alert("Please complete the task before deleting.");
          }
        }}
      >
        🗑️
      </button>
    </div>
  );
}

export default TodoItem;
