import * as React from "react";
import TaskListItem from "./TaskListItem";
import { ITask } from "./TasksData";

interface IProps {
  tasks: ITask[];
  newTask: ITask;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>, id: string) => void;
  onAddButtonClick: () => void;
  onCloseClick: (id: string) => void;
  onTextareaChange: (title: string) => void;
  handleTextareaClick: (id: string) => void;
}

const TaskList: React.FC<IProps> = props => {
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const title = e.currentTarget.value;
    props.onTextareaChange(title);
  };

  return (
    <div className="container my-4 m-auto p-4 shadow w-5/6">
      <button
        onClick={props.onAddButtonClick}
        className="bg-teal hover:bg-teal-dark text-white font-bold py-2 px-4 my-2 rounded"
      >
        Add Task
      </button>
      {props.tasks.map(task => (
        <TaskListItem
          key={task.id}
          title={task.title}
          onCloseClick={() => props.onCloseClick(task.id)}
          onClick={() => props.handleTextareaClick(task.id)}
          onKeyDown={e => props.onKeyDown(e, task.id)}
          onChange={handleTextareaChange}
        />
      ))}
    </div>
  );
};

export default TaskList;
