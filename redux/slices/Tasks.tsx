import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit';
import type { Task } from '@/types/taskTypes';


type TaskState = {
  tasks: Task[];
};

const initialState: TaskState = {
  tasks: [],
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask(state, action) {
      const { title, description, dueDate, priority } = action.payload;
      state.tasks.push({
        id: nanoid(),
        title,
        description,
        dueDate,
        priority,
        active: true,
      });
    },
    completeTask(state, action: PayloadAction<string>) {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.active = false;
      }
    },
    deleteTask(state, action: PayloadAction<string>) {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
  },
});

export const { addTask, completeTask, deleteTask } = taskSlice.actions;
export default taskSlice.reducer;
