import "@/styles/globals.css";
import { TaskProvider } from "@/context/TaskContext";

export default function App({ Component, pageProps }) {
  const { initialTasks = [] } = pageProps;
  return (
    <TaskProvider initialTasks={initialTasks}>
      <main className="container">
        <Component {...pageProps} />
      </main>
    </TaskProvider>
  );
}
