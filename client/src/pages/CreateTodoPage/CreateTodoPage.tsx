import clsx from 'clsx';
import { FC, useState } from 'react';
import { CloseIcon } from 'src/icons';
import { ITodo } from 'src/types';
import { CreateNoteForm } from './CreateNoteForm';
import { CreateTaskForm } from './CreateTaskForm';

import styles from './CreateTodoPage.module.scss';

interface Props {
  close: () => void;
  createTodo: (todo: ITodo) => void;
}

enum TodoType {
  Note,
  Task,
}

export const CreateTodoPage: FC<Props> = (props) => {
  const { close, createTodo } = props;

  const [todoType, setTodoType] = useState(TodoType.Note);

  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <CloseIcon className={styles.closeIcon} onClick={close} />

        <div className={styles.switchTodoType}>
          <div
            className={clsx(styles.type, { [styles.selected]: todoType === TodoType.Note })}
            onClick={() => setTodoType(TodoType.Note)}
          >
            Note
          </div>
          <div
            className={clsx(styles.type, { [styles.selected]: todoType === TodoType.Task })}
            onClick={() => setTodoType(TodoType.Task)}
          >
            Task
          </div>
        </div>
        {todoType === TodoType.Note && <CreateNoteForm createTodo={createTodo} close={close} />}
        {todoType === TodoType.Task && <CreateTaskForm createTodo={createTodo} close={close} />}
      </div>
    </div>
  );
};
