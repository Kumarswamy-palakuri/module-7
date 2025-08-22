import { useCallback, useContext } from "react";
import axios from "axios";
import { TaskContext } from "@/context/TaskContext";

export default function useTasks() {
  const ctx = useContext(TaskContext);
  if (!ctx) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  const { state, dispatch, ACTIONS } = ctx;

  // Optional: expose counters
  const total = state.tasks.length;
  const completed = state.tasks.filter(t => t.completed).length;

  const hydrate = useCallback((list) => {
    dispatch({ type: ACTIONS.HYDRATE, payload: list });
  }, [dispatch, ACTIONS]);

  const add = useCallback(async (text) => {
    const { data } = await axios.post("/api/tasks", { text });
    dispatch({ type: ACTIONS.ADD, payload: data });
  }, [dispatch, ACTIONS]);

  const remove = useCallback(async (id) => {
    await axios.delete(`/api/tasks?id=${encodeURIComponent(id)}`);
    dispatch({ type: ACTIONS.REMOVE, payload: id });
  }, [dispatch, ACTIONS]);

  const toggle = useCallback(async (id) => {
    const { data } = await axios.patch("/api/tasks", { id });
    // dispatch local toggle for snappy UI (server confirms)
    dispatch({ type: ACTIONS.TOGGLE, payload: id });
    return data;
  }, [dispatch, ACTIONS]);

  return {
    tasks: state.tasks,
    total,
    completed,
    hydrate,
    add,
    remove,
    toggle
  };
}
