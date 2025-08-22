import { getTasks, addTask, removeTask, toggleTask } from "@/lib/tasksStore";

export default function handler(req, res) {
  const { method } = req;

  try {
    if (method === "GET") {
      return res.status(200).json(getTasks());
    }

    if (method === "POST") {
      const { text } = req.body || {};
      if (!text || !text.trim()) {
        return res.status(400).json({ error: "Task text is required" });
      }
      const created = addTask(text.trim());
      return res.status(201).json(created);
    }

    if (method === "DELETE") {
      const { id } = req.query;
      if (!id) return res.status(400).json({ error: "id is required" });
      removeTask(id);
      return res.status(204).end();
    }

    if (method === "PATCH") {
      const { id } = req.body || {};
      if (!id) return res.status(400).json({ error: "id is required" });
      const updated = toggleTask(id);
      return res.status(200).json(updated);
    }

    res.setHeader("Allow", ["GET", "POST", "DELETE", "PATCH"]);
    return res.status(405).end(`Method ${method} Not Allowed`);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
