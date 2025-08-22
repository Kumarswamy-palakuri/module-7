import { v4 as uuid } from "uuid";

/**
 * In-memory store (demo only).
 * In real apps, replace with DB.
 */
let TASKS = [
  { id: uuid(), text: "Finish Wipro Week 7 assignment", completed: false },
  { id: uuid(), text: "Review Context API & Hooks", completed: true }
];

export function getTasks() {
  // Return a deep copy to avoid accidental mutation
  return JSON.parse(JSON.stringify(TASKS));
}

export function addTask(text) {
  const task = { id: uuid(), text, completed: false };
  TASKS = [task, ...TASKS];
  return task;
}

export function removeTask(id) {
  TASKS = TASKS.filter(t => t.id !== id);
  return true;
}

export function toggleTask(id) {
  TASKS = TASKS.map(t => (t.id === id ? { ...t, completed: !t.completed } : t));
  return TASKS.find(t => t.id === id);
}

export function hydrateTasks(list) {
  // Replace full list (used if you want to overwrite)
  TASKS = Array.isArray(list) ? list : TASKS;
}
