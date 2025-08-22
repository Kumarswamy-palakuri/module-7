import useTasks from "@/hooks/useTasks";

export default function TaskItem({ task }) {
  const { toggle, remove } = useTasks();

  return (
    <li className="item">
      <label className="left">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggle(task.id)}
        />
        <span className={task.completed ? "done" : ""}>{task.text}</span>
      </label>

      <button className="danger" onClick={() => remove(task.id)}>
        Remove
      </button>

      <style jsx>{`
        .item {
          display:flex; align-items:center; justify-content:space-between;
          padding:10px 12px; border:1px solid #eee; border-radius:10px; margin-bottom:8px;
          background:#fff;
        }
        .left { display:flex; align-items:center; gap:10px; }
        .done { text-decoration: line-through; opacity:0.6; }
        .danger { background:#e11d48; color:#fff; border:none; padding:8px 10px; border-radius:8px; cursor:pointer; }
        .danger:hover { opacity:0.9; }
      `}</style>
    </li>
  );
}
