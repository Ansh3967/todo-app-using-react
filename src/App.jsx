import { useEffect, useState } from "react";
import { TodoProvider } from "./contents";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
  };

  const updateTodo = (id, todo) => {
    setTodos((prev) =>
      prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo))
    );
  };

  const delTodo = (id) => {
    setTodos((prev) => prev.filter((prevTodo) => prevTodo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, completed: !prevTodo.completed }
          : prevTodo
      )
    );
  };

  useEffect(() => {
    try {
      const todo = JSON.parse(localStorage.getItem("todos"));
      if (todo && todo.length > 0) {
        setTodos(todo);
      }
    } catch (error) {
      console.error("Failed to parse todos from localStorage:", error);
      // Optionally clear invalid data or set to default empty array
      setTodos([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoProvider
      value={{ todos, addTodo, updateTodo, delTodo, toggleComplete }}
    >
      <div className="bg-gradient-to-br from-blue-300 to-purple-400 min-h-screen py-12 flex justify-center items-center">
        <div className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg w-full max-w-2xl mx-auto shadow-xl rounded-xl p-6 text-gray-800">
          <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-900 drop-shadow-md">
            Your Daily Tasks
          </h1>
          <div className="mb-6">
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-4">
            {todos.length === 0 && (
              <p className="text-center w-full text-gray-600 italic">
                No tasks yet! Add one above.
              </p>
            )}
            {todos.map((todo) => (
              <div key={todo.id} className="w-full">
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
