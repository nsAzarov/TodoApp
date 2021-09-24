import { FC } from 'react';
import { PrimaryButton, ProgressBar } from 'src/components';
import styles from './StartPage.module.scss';

interface Props {
  goToAllTasks: () => void;
}

export const StartPage: FC<Props> = (props) => {
  const { goToAllTasks } = props;

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
      <ProgressBar strokeWidth={10} sqSize={200} percentage={70} />
      <PrimaryButton onClick={goToAllTasks} className={styles.button}>
        Show tasks
      </PrimaryButton>
    </div>
  );
};
