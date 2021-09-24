import clsx from 'clsx';
import { FC, MouseEvent, useCallback, useState } from 'react';
import { ArrowIcon, TrashIcon } from 'src/icons';
import { EditTaskPage } from 'src/pages';
import { ITask, ITodo } from 'src/types';
import styles from './Task.module.scss';

interface Props {
  task: ITask;
  edit: (todo: ITodo) => void;
  del: (id: string) => void;
  className?: string;
}

export const Task: FC<Props> = (props) => {
  const { task, edit, del, className } = props;

  const [taskPageOpen, setTaskPageOpen] = useState(false);

  const handleDelete = useCallback(
    (e: MouseEvent<SVGSVGElement>) => {
      del(task.id);
      e.stopPropagation();
    },
    [task.id, del],
  );

  if (taskPageOpen) {
    return (
      <EditTaskPage
        id={task.id}
        title={task.title}
        description={task.description}
        timeSpent={task.timeSpent}
        timeLeft={task.timeLeft}
        importance={task.importance}
        status={task.status}
        edit={edit}
        close={() => setTaskPageOpen(false)}
      />
    );
  }

  return (
    <div className={clsx(styles.wrapper, className)} onClick={() => setTaskPageOpen(true)}>
      <div className={styles.header}>
        <span>{task.title}</span>
        <div>
          <ArrowIcon className={styles.arrowIcon} />
          <TrashIcon className={styles.trashIcon} onClick={handleDelete} />
        </div>
      </div>
      <div className={styles.description}>{task.description}</div>
      <div className={styles.info}>
        <div className={styles.statusField}>Spent: {task.timeSpent}</div>
        <div className={styles.statusField}>Left: {task.timeLeft}</div>
        <div className={styles.statusField}>{task.importance}</div>
        <div className={styles.statusField}>{task.status}</div>
      </div>
    </div>
  );
};
