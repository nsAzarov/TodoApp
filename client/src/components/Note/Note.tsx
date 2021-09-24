import clsx from 'clsx';
import { FC, MouseEvent, useCallback } from 'react';
import { TrashIcon } from 'src/icons';
import { INote } from 'src/types';
import { Checkbox } from '../Checkbox';

import styles from './Note.module.scss';

interface Props {
  note: INote;
  toggle: (id: string) => void;
  del: (id: string) => void;
  className?: string;
}

export const Note: FC<Props> = (props) => {
  const { note, toggle, del, className } = props;

  const handleToggle = useCallback(() => toggle(note.id), [note.id, toggle]);
  const handleDelete = useCallback(
    (e: MouseEvent<SVGSVGElement>) => {
      del(note.id);
      e.stopPropagation();
    },
    [note.id, del],
  );

  return (
    <div className={clsx(styles.wrapper, className)}>
      <div className={styles.title}>{note.title}</div>
      <Checkbox checked={note.done} toggle={handleToggle} />
      <TrashIcon className={styles.trashIcon} onClick={handleDelete} />
    </div>
  );
};
