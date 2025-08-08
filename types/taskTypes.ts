export type Priority = 'Low' | 'Medium' | 'High';

export type Task = {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: Priority;
  active: boolean;
};