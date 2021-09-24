import { FC, useCallback, useState } from 'react';
import { PrimaryButton } from 'src/components';
import { ITodo, TodoType } from 'src/types';

import styles from './CreateNoteForm.module.scss';

interface Props {
  createTodo: (todo: ITodo) => void;
  close: () => void;
}

export const CreateNoteForm: FC<Props> = (props) => {
  const { createTodo, close } = props;

  const id = new Date().getTime().toString();
  const [title, setTitle] = useState('');

  const handleCreate = useCallback(() => {
    createTodo({ id, type: TodoType.Note, title, done: false } as ITodo);
    close();
  }, [createTodo, close, id, title]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.label}>Title</div>
      <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} />
      <PrimaryButton onClick={handleCreate} className={styles.submitButton}>
        Create
      </PrimaryButton>
    </div>
  );
};
