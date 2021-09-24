import { ITask } from './ITask';
import { INote } from './INote';
import { TodoType } from './TodoType';

export interface ITodo extends INote, ITask {
  type: TodoType;
}
