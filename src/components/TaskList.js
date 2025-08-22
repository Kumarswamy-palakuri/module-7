import useTasks from "@/hooks/useTasks";
import TaskItem from "./TaskItem";

export default function TaskList() {
  const { tasks, total, completed } = useTasks();

  return (
    <section>
      <header className="stats">
        <div>Total: <b>{total}</b></div>
        <div>Completed: <b>{completed}</b></div>
      </header>

      <ul className="list">
        {tasks.length === 0 && <p>No tasks yet. Add one above!</p>}
        {tasks.map(t => <TaskItem key={t.id} task={t} />)}
      </ul>

      <style jsx>{`
        .stats { display:flex; gap:16px; margin:16px 0; }
        .list { list-style:none; padding:0; margin:0; }
      `}</style>
    </section>
  );
}
