import AddTask from "@/components/AddTask";
import TaskList from "@/components/TaskList";
import { getTasks } from "@/lib/tasksStore";

export default function Home() {
  return (
    <>
      <h1>Task Management (Next.js + Context + Hooks)</h1>
      <AddTask />
      <TaskList />
      <style jsx>{`
        h1 { font-size:22px; margin:12px 0; }
      `}</style>
    </>
  );
}

// SSR: Serve initial list
export async function getServerSideProps() {
  const initialTasks = getTasks(); // read from shared in-memory store
  return { props: { initialTasks } };
}
