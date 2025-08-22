import { createContext, useReducer, useMemo } from "react";

export const TaskContext = createContext(null);

const ACTIONS = {
  HYDRATE: "HYDRATE",
  ADD: "ADD",
  REMOVE: "REMOVE",
  TOGGLE: "TOGGLE"
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.HYDRATE:
      return { ...state, tasks: action.payload || [] };

    case ACTIONS.ADD:
      return { ...state, tasks: [action.payload, ...state.tasks] };

    case ACTIONS.REMOVE:
      return { ...state, tasks: state.tasks.filter(t => t.id !== action.payload) };

    case ACTIONS.TOGGLE:
      return {
        ...state,
        tasks: state.tasks.map(t =>
          t.id === action.payload ? { ...t, completed: !t.completed } : t
        )
      };

    default:
      return state;
  }
}

export function TaskProvider({ children, initialTasks = [] }) {
  const [state, dispatch] = useReducer(reducer, { tasks: initialTasks });

  const value = useMemo(() => ({ state, dispatch, ACTIONS }), [state]);

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}
