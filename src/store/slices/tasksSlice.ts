import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import secureStorage from "../../utils/secureStorage";
import { Task } from "../../interfaces/taskInterfaces";

interface TasksState {
  tasks: Task[];
}

const initialState: TasksState = {
  tasks: [],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<{ id: number; task: string }>) => {
      state.tasks.push({ ...action.payload, isCompleted: false });
      secureStorage.saveTasks(state.tasks);
    },
    toggleTaskCompletion: (state, action: PayloadAction<number>) => {
      const task = state.tasks.find((t) => t.id === action.payload);
      if (task) {
        task.isCompleted = !task.isCompleted;
        secureStorage.saveTasks(state.tasks);
      }
    },
    removeTask: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload);
      secureStorage.saveTasks(state.tasks);
    },
    clearTasks: (state) => {
      state.tasks = [];
      secureStorage.clearTasks();
    },
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
      secureStorage.saveTasks(state.tasks);
    },
  },
});

export const {
  addTask,
  toggleTaskCompletion,
  removeTask,
  clearTasks,
  setTasks,
} = tasksSlice.actions;
export const getTasks = (state: { tasks: TasksState }) => state.tasks.tasks;

export default tasksSlice.reducer;
