import { useState } from "react";
import "./TodoList.css";
import { v4 as uuidv4 } from "uuid";

export default function TodoList() {
  let [todos, setTodos] = useState([
    { task: "sample-task", id: uuidv4(), isDone: false },
  ]);
  let [newTodo, setNewTodo] = useState("");

  let addNewTask = () => {
    if (newTodo.trim() !== "") {
      setTodos((prevTodos) => {
        return [...prevTodos, { task: newTodo, id: uuidv4(), isDone: false }];
      });
      setNewTodo("");
    }
  };

  let updateTodoValues = (event) => {
    setNewTodo(event.target.value);
  };

  let deleteTodo = (id) => {
    setTodos(() => todos.filter((prevTodos) => prevTodos.id != id));
  };
  let markAllDone = () => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        return {
          ...todo,
          isDone: true,
        };
      })
    );
  };

  let markAsDone = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id == id) {
          return {
            ...todo,
            isDone: true,
          };
        } else {
          return todo;
        }
      })
    );
  };

  return (
    <div className="container">
      <h2 className="heading">Todo List</h2>
      <input
        type="text"
        placeholder="Add Your Task"
        value={newTodo}
        onChange={updateTodoValues}
        className="inputField"
      />
      <button onClick={addNewTask} className="addButton">
        Add Task
      </button>
      <hr className="hrStyle" />
      <h4>Task Todo</h4>
      <hr className="hrStyle" />
      <ul className="taskList">
        {todos.map((todo) => (
          <li key={todo.id} className="taskItem">
            <span
              style={todo.isDone ? { textDecorationLine: "line-through" } : {}}
            >
              {todo.task}
            </span>
            <button onClick={() => deleteTodo(todo.id)} className="deleteButton">
              Delete
            </button>
            <button onClick={() => markAsDone(todo.id)} className="markDone">
              Mark As Done
            </button>
          </li>
        ))}
      </ul>
      <button onClick={markAllDone} className="markAllDoneButton">
        Mark All As Done
      </button>
    </div>
  );
  
}
