import React, { createContext, useReducer, useContext, useState } from "react";
import "./App.css";

// ---------------- Context + Reducer ----------------
const TaskContext = createContext();

const ACTIONS = {
  ADD: "ADD",
  REMOVE: "REMOVE",
  TOGGLE: "TOGGLE"
};

function taskReducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD:
      return [...state, { id: Date.now(), text: action.payload, completed: false }];
    case ACTIONS.REMOVE:
      return state.filter(task => task.id !== action.payload);
    case ACTIONS.TOGGLE:
      return state.map(task =>
        task.id === action.payload ? { ...task, completed: !task.completed } : task
      );
    default:
      return state;
  }
}

function TaskProvider({ children }) {
  const [tasks, dispatch] = useReducer(taskReducer, [
    { id: 1, text: "Finish Wipro Week 7 assignment", completed: false },
    { id: 2, text: "Review Context API & Hooks", completed: true }
  ]);

  return (
    <TaskContext.Provider value={{ tasks, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}

// ---------------- Custom Hook ----------------
function useTasks() {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error("useTasks must be used inside TaskProvider");
  const { tasks, dispatch } = ctx;

  const add = text => dispatch({ type: ACTIONS.ADD, payload: text });
  const remove = id => dispatch({ type: ACTIONS.REMOVE, payload: id });
  const toggle = id => dispatch({ type: ACTIONS.TOGGLE, payload: id });

  return { tasks, add, remove, toggle };
}

// ---------------- Components ----------------
function AddTask() {
  const [text, setText] = useState("");
  const { add } = useTasks();

  const handleSubmit = e => {
    e.preventDefault();
    if (!text.trim()) return;
    add(text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
      <input
        type="text"
        placeholder="Add new task..."
        value={text}
        onChange={e => setText(e.target.value)}
        style={{ padding: "8px", marginRight: "8px" }}
      />
      <button type="submit">Add Task</button>
    </form>
  );
}

function TaskItem({ task }) {
  const { toggle, remove } = useTasks();
  return (
    <li style={{ marginBottom: "8px" }}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggle(task.id)}
      />
      <span style={{ marginLeft: "8px", textDecoration: task.completed ? "line-through" : "none" }}>
        {task.text}
      </span>
      <button
        onClick={() => remove(task.id)}
        style={{ marginLeft: "12px", background: "red", color: "white" }}
      >
        Remove
      </button>
    </li>
  );
}

function TaskList() {
  const { tasks } = useTasks();
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;

  return (
    <div>
      <h3>Total: {total} | Completed: {completed}</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {tasks.length === 0 && <p>No tasks yet. Add one above!</p>}
        {tasks.map(task => (
          <TaskItem key={task.id} task={task} />
        ))}
      </ul>
    </div>
  );
}

// ---------------- Main App ----------------
function App() {
  return (
    <TaskProvider>
      <div style={{ maxWidth: "500px", margin: "20px auto", padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}>
        <h1>Task Management App</h1>
        <AddTask />
        <TaskList />
      </div>
    </TaskProvider>
  );
}

export default App;
