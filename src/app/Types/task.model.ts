import Step from "./step.model";

export default interface Task {
  name: string;
  done: boolean;
  id: string;
  title: string;
  important: boolean;
  date: Date;
  steps?: Step[];
  description? : string | null;
  dueDate?: Date;
  
}
