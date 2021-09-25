import { FC } from 'react';
import { PrimaryButton, ProgressBar, Spinner } from 'src/components';
import styles from './StartPage.module.scss';

interface Props {
  doneTodosCount: number;
  goToAllTasks: () => void;
}

export const StartPage: FC<Props> = (props) => {
  const { doneTodosCount, goToAllTasks } = props;

  if (doneTodosCount === 0) {
    return (
      <div className={styles.wrapper}>
        <Spinner />
      </div>
    );
  }

  let welcomeText;
  var today = new Date();
  var curHr = today.getHours();

  if (curHr < 12) {
    welcomeText = 'Good Morning!';
  } else if (curHr < 18) {
    welcomeText = 'Good Afternoon!';
  } else {
    welcomeText = 'Good Evening!';
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>{welcomeText}</div>
      <ProgressBar strokeWidth={10} sqSize={200} percentage={+(doneTodosCount * 100).toFixed(2)} />
      <PrimaryButton onClick={goToAllTasks} className={styles.button}>
        Show tasks
      </PrimaryButton>
    </div>
  );
};
