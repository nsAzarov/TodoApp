import clsx from 'clsx';
import { FC } from 'react';
import { Status } from 'src/types';

import styles from '../Selectors.module.scss';

interface Props {
  status: Status;
  setStatus: (val: Status) => void;
}

export const StatusSelector: FC<Props> = (props) => {
  const { status, setStatus } = props;
  return (
    <div className={styles.selectors}>
      <div
        className={clsx(styles.option, { [styles.selected]: status === Status.Todo })}
        onClick={() => setStatus(Status.Todo)}
      >
        {Status.Todo}
      </div>
      <div
        className={clsx(styles.option, { [styles.selected]: status === Status.InProgress })}
        onClick={() => setStatus(Status.InProgress)}
      >
        {Status.InProgress}
      </div>
      <div
        className={clsx(styles.option, { [styles.selected]: status === Status.InReview })}
        onClick={() => setStatus(Status.InReview)}
      >
        {Status.InReview}
      </div>
      <div
        className={clsx(styles.option, { [styles.selected]: status === Status.Done })}
        onClick={() => setStatus(Status.Done)}
      >
        {Status.Done}
      </div>
    </div>
  );
};
