import { FC, useState } from 'react';
import { Note, PrimaryButton, Task } from 'src/components';
import { INote, ITask, ITodo } from 'src/types';
import { CreateTodoPage } from '../CreateTodoPage';
import styles from './TodosPage.module.scss';

interface Props {
  todos: ITodo[];
  activePage: number;
  pagesCount: number;
  setActivePage: (val: number) => void;
  createTodo: (todo: ITodo) => void;
  editTask: (todo: ITodo) => void;
  toggleNoteDone: (id: string) => void;
  deleteTodo: (id: string) => void;
}

export const TodosPage: FC<Props> = (props) => {
  const { todos, pagesCount, activePage, setActivePage, createTodo, editTask, toggleNoteDone, deleteTodo } = props;

  const [createTodoPageOpen, setCreateTodoPageOpen] = useState(false);

  if (createTodoPageOpen) {
    return <CreateTodoPage close={() => setCreateTodoPageOpen(false)} createTodo={createTodo} />;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>All Tasks</div>
      <div className={styles.todosList}>
        {todos.map((todo) => {
          switch (todo.type) {
            case 'NOTE':
              return (
                <Note
                  key={todo.id}
                  note={todo as INote}
                  toggle={toggleNoteDone}
                  del={deleteTodo}
                  className={styles.todo}
                />
              );
            case 'TASK':
              return (
                <Task key={todo.id} task={todo as ITask} edit={editTask} del={deleteTodo} className={styles.todo} />
              );
            default:
              return null;
          }
        })}
        <div className={styles.pagination}>
          <div onClick={() => setActivePage(activePage - 1)}>←</div>
          <div>
            {activePage}/{pagesCount}
          </div>
          <div onClick={() => setActivePage(activePage + 1)}>→</div>
        </div>
      </div>
      <PrimaryButton onClick={() => setCreateTodoPageOpen(true)} className={styles.newTaskButton}>
        Create new task
      </PrimaryButton>
    </div>
  );
};
