import clsx from 'clsx';
import { FC } from 'react';
import { Importance } from 'src/types';

import styles from '../Selectors.module.scss';

interface Props {
  importance: Importance;
  setImportance: (val: Importance) => void;
}

export const ImportanceSelector: FC<Props> = (props) => {
  const { importance, setImportance } = props;
  return (
    <div className={styles.selectors}>
      <div
        className={clsx(styles.option, { [styles.selected]: importance === Importance.Trivial })}
        onClick={() => setImportance(Importance.Trivial)}
      >
        {Importance.Trivial}
      </div>
      <div
        className={clsx(styles.option, { [styles.selected]: importance === Importance.Minor })}
        onClick={() => setImportance(Importance.Minor)}
      >
        {Importance.Minor}
      </div>
      <div
        className={clsx(styles.option, { [styles.selected]: importance === Importance.Serious })}
        onClick={() => setImportance(Importance.Serious)}
      >
        {Importance.Serious}
      </div>
      <div
        className={clsx(styles.option, { [styles.selected]: importance === Importance.Blocker })}
        onClick={() => setImportance(Importance.Blocker)}
      >
        {Importance.Blocker}
      </div>
      <div
        className={clsx(styles.option, { [styles.selected]: importance === Importance.Critical })}
        onClick={() => setImportance(Importance.Critical)}
      >
        {Importance.Critical}
      </div>
    </div>
  );
};
