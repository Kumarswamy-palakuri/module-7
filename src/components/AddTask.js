import { useState } from "react";
import useTasks from "@/hooks/useTasks";

export default function AddTask() {
  const [text, setText] = useState("");
  const { add } = useTasks();

  async function onSubmit(e) {
    e.preventDefault();
    if (!text.trim()) return;
    await add(text.trim());
    setText("");
  }

  return (
    <form onSubmit={onSubmit} className="add-form">
      <input
        type="text"
        placeholder="Add a new task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="input"
      />
      <button type="submit" className="btn">Add Task</button>
      <style jsx>{`
        .add-form { display:flex; gap:8px; margin:12px 0; }
        .input { flex:1; padding:10px; border:1px solid #e3e3e3; border-radius:8px; }
        .btn { padding:10px 14px; border-radius:8px; border: none; background:#111; color:#fff; cursor:pointer; }
        .btn:hover { opacity:0.9; }
      `}</style>
    </form>
  );
}
