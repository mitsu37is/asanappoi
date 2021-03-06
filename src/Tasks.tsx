import * as React from "react";
import { ITask } from "./TasksData";
import TaskList from "./TaskList";
import TaskDetail from "./TaskDetail";
import {
  getAllTasks,
  changeInput,
  addTask,
  changeCurrentTask,
  deleteTask,
  changeTitle,
  changeDescription
} from "./TasksActions";
import { connect } from "react-redux";
import { IApplicationState } from "./Store";

interface IProps {
  getAllTasks: typeof getAllTasks;
  changeInput: typeof changeInput;
  addTask: typeof addTask;
  changeCurrentTask: typeof changeCurrentTask;
  deleteTask: typeof deleteTask;
  changeTitle: typeof changeTitle;
  changeDescription: typeof changeDescription;

  tasks: ITask[];
  newTask: ITask;
  currentTask: ITask;
}

class Tasks extends React.Component<IProps> {
  public componentDidMount() {
    this.props.getAllTasks();
  }

  public render() {
    return (
      <div className="flex flex-col md:flex-row">
        <TaskList
          tasks={this.props.tasks}
          newTask={this.props.newTask}
          handleTextareaClick={this.changeCurrentTask}
          onAddButtonClick={this.handleAddButtonClick}
          onCloseClick={this.deleteTask}
          onTextareaChange={this.handleTitleChange}
          onKeyDown={this.handleKeyDown}
        />
        <TaskDetail
          task={this.props.currentTask}
          onDescriptionChange={this.handleDescriptionChange}
          onTitleChange={this.handleTitleChange}
        />
      </div>
    );
  }

  private handleAddButtonClick = () => {
    this.props.addTask(this.props.newTask);
  };

  private handleTitleChange = (title: string) => {
    this.props.changeTitle(title);
  };

  private handleDescriptionChange = (content: string) => {
    this.props.changeDescription(content);
  };

  private deleteTask = (id: string) => {
    this.props.deleteTask(id);
  };

  private newTaskCreate = () => {
    this.props.addTask(this.props.newTask);
  };

  private handleKeyDown = (
    e: React.KeyboardEvent<HTMLTextAreaElement>,
    id: string
  ) => {
    if (e.keyCode === 13 && e.currentTarget.value !== "") {
      e.preventDefault();
      this.newTaskCreate();
    } else if (e.keyCode === 13) {
      e.preventDefault();
    } else if (
      (e.keyCode === 8 || e.keyCode === 46) &&
      e.currentTarget.value === ""
    ) {
      this.deleteTask(id);
    } else if (e.shiftKey && (e.keyCode === 8 || e.keyCode === 46)) {
      this.deleteTask(id);
    }
  };

  private changeCurrentTask = (id: string) => {
    this.props.changeCurrentTask(id);
  };
}

const mapStateToProps = (store: IApplicationState) => {
  return {
    tasks: store.tasks.tasks,
    newTask: store.tasks.newTask,
    currentTask: store.tasks.currentTask
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getAllTasks: () => dispatch(getAllTasks()),
    addTask: (task: ITask) => dispatch(addTask(task)),
    deleteTask: (id: string) => dispatch(deleteTask(id)),
    changeInput: (title: string) => dispatch(changeInput(title)),
    changeCurrentTask: (id: string) => dispatch(changeCurrentTask(id)),
    changeTitle: (title: string) => dispatch(changeTitle(title)),
    changeDescription: (content: string) => dispatch(changeDescription(content))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tasks);
