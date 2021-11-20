import { FC, useState } from 'react';
import { Note, PrimaryButton, Task } from 'src/components';
import { ITodo } from 'src/types';
import { isNote } from 'src/utils';
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
  setOnlyDone: (val: boolean) => void;
}

export const TodosPage: FC<Props> = (props) => {
  const {
    todos,
    pagesCount,
    activePage,
    setActivePage,
    createTodo,
    editTask,
    toggleNoteDone,
    deleteTodo,
    setOnlyDone,
  } = props;

  const [createTodoPageOpen, setCreateTodoPageOpen] = useState(false);

  if (createTodoPageOpen) {
    return <CreateTodoPage close={() => setCreateTodoPageOpen(false)} createTodo={createTodo} />;
  }

  return (
    <div className={styles.wrapper}>
      <button onClick={() => setOnlyDone(true)}>filter</button>
      <div className={styles.header}>All Tasks</div>
      <div className={styles.todosList}>
        {todos.map((todo) =>
          isNote(todo) ? (
            <Note key={todo.id} note={todo} toggle={toggleNoteDone} del={deleteTodo} className={styles.todo} />
          ) : (
            <Task key={todo.id} task={todo} edit={editTask} del={deleteTodo} className={styles.todo} />
          ),
        )}
        <div className={styles.pagination}>
          <div className={styles.arrow} onClick={() => setActivePage(activePage - 1)}>
            ←
          </div>
          <div>
            {activePage}/{pagesCount - 1}
          </div>
          <div className={styles.arrow} onClick={() => setActivePage(activePage + 1)}>
            →
          </div>
        </div>
      </div>
      <PrimaryButton onClick={() => setCreateTodoPageOpen(true)} className={styles.newTaskButton}>
        Create new task
      </PrimaryButton>
    </div>
  );
};
