import { watchFile } from "fs";
import Utils from "./Utils";

export interface ITask {
  id: string;
  title: string;
  description: string;
}

export const newTask: ITask = {
  id: Utils.newId(),
  title: "",
  description: ""
};

export const tasks: ITask[] = [
  {
    id: "1",
    title: "something to do",
    description: "it is a description for this task. Please read me."
  },
  {
    id: "2",
    title: "anything to do",
    description: "it is a description for this task. Please read me."
  },
  {
    id: "3",
    title: "everything to do",
    description: "it is a description for this task. Please read me."
  },
  {
    id: "4",
    title: "nothing to do",
    description: "it is a description for this task. Please read me."
  }
];
