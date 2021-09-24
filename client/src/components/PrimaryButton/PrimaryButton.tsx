import clsx from 'clsx';
import { FC } from 'react';

import styles from './PrimaryButton.module.scss';

interface Props {
  onClick: () => void;
  className?: string;
}

export const PrimaryButton: FC<Props> = (props) => {
  const { onClick, children, className } = props;
  return (
    <div className={clsx(styles.wrapper, className)} onClick={onClick}>
      {children}
    </div>
  );
};
