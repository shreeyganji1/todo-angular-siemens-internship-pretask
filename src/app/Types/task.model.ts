import Step from './step.model'; // Ensure the correct import path

export default interface Task {
  id: string;
  name: string;
  done: boolean;
  important: boolean;
  date: Date;
  taskListId?: string;
  steps?: Step[];
  description?: string | null;
  dueDate?: Date;
}
