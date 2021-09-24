import { FC, useCallback, useState } from 'react';
import { ImportanceSelector, PrimaryButton, StatusSelector } from 'src/components';
import { CloseIcon } from 'src/icons';
import { Importance, ITodo, Status, TodoType } from 'src/types';

import styles from './EditTaskPage.module.scss';

interface Props {
  id: string;
  title: string;
  description: string;
  timeSpent: string;
  timeLeft: string;
  importance: Importance;
  status: Status;
  edit: (todo: ITodo) => void;
  close: () => void;
}

export const EditTaskPage: FC<Props> = (props) => {
  const { id, close, edit } = props;

  const [title, setTitle] = useState(props.title);
  const [description, setDescription] = useState(props.description);
  const [timeSpent, setTimeSpent] = useState(props.timeSpent);
  const [timeLeft, setTimeLeft] = useState(props.timeLeft);
  const [importance, setImportance] = useState<Importance>(props.importance);
  const [status, setStatus] = useState<Status>(props.status);

  const handleEdit = useCallback(() => {
    edit({ id, type: TodoType.Task, title, description, timeSpent, timeLeft, importance, status } as ITodo);
    close();
  }, [edit, close, id, title, description, timeSpent, timeLeft, importance, status]);

  return (
    <div className={styles.wrapper}>
      <CloseIcon className={styles.closeIcon} onClick={close} />
      <div className={styles.form}>
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
        <PrimaryButton onClick={handleEdit} className={styles.submitButton}>
          Edit
        </PrimaryButton>
      </div>
    </div>
  );
};
