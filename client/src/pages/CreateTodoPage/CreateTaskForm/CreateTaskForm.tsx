import { FC, useCallback, useState } from 'react';
import { PrimaryButton } from 'src/components';
import { Importance, ITodo, Status, TodoType } from 'src/types';
import styles from './CreateTaskForm.module.scss';
import { ImportanceSelector, StatusSelector } from 'src/components';

interface Props {
  createTodo: (todo: ITodo) => void;
  close: () => void;
}

export const CreateTaskForm: FC<Props> = (props) => {
  const { createTodo, close } = props;

  const id = new Date().getTime().toString();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [timeSpent, setTimeSpent] = useState('');
  const [timeLeft, setTimeLeft] = useState('');
  const [importance, setImportance] = useState<Importance>(Importance.Serious);
  const [status, setStatus] = useState<Status>(Status.Todo);

  const handleCreate = useCallback(() => {
    createTodo({ id, type: TodoType.Task, title, description, timeSpent, timeLeft, importance, status } as ITodo);
    close();
  }, [createTodo, close, id, title, description, timeSpent, timeLeft, importance, status]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.label}>Title</div>
      <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} />
      <div className={styles.label}>Description</div>
      <input type='text' value={description} onChange={(e) => setDescription(e.target.value)} />
      <div className={styles.label}>Time spent</div>
      <input type='text' value={timeSpent} onChange={(e) => setTimeSpent(e.target.value)} />
      <div className={styles.label}>Time left</div>
      <input type='text' value={timeLeft} onChange={(e) => setTimeLeft(e.target.value)} />
      <div className={styles.label}>Importance</div>
      <ImportanceSelector importance={importance} setImportance={setImportance} />
      <div className={styles.label}>Status</div>
      <StatusSelector status={status} setStatus={setStatus} />
      <PrimaryButton onClick={handleCreate} className={styles.submitButton}>
        Create
      </PrimaryButton>
    </div>
  );
};
