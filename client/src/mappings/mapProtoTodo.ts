import { mapProtoStatus } from './mapProtoStatus';
import { mapProtoImportance } from './mapProtoImportance';
import { IProtoTodo, ITodo, TodoType } from '../types';

export const mapProtoTodo = (todo: IProtoTodo): ITodo => {
  if (todo.type === TodoType.Task && todo.importance !== undefined) {
    todo.importance = mapProtoImportance(+todo.importance);
  }
  if (todo.type === TodoType.Task && todo.status !== undefined) {
    todo.status = mapProtoStatus(+todo.status);
  }
  return todo as ITodo;
};
