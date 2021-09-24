import { FC } from 'react';
import styles from './ProgressBar.module.scss';

interface Props {
  sqSize: number;
  percentage: number;
  strokeWidth: number;
}

// https://codepen.io/bbrady/pen/ozrjKE
export const ProgressBar: FC<Props> = (props) => {
  const { sqSize, percentage, strokeWidth } = props;
  const radius = (sqSize - strokeWidth) / 2;
  const viewBox = `0 0 ${sqSize} ${sqSize}`;
  const dashArray = radius * Math.PI * 2;
  const dashOffset = dashArray - (dashArray * percentage) / 100;

  return (
    <svg width={sqSize} height={sqSize} viewBox={viewBox}>
      <circle
        className={styles.background}
        cx={sqSize / 2}
        cy={sqSize / 2}
        r={radius}
        strokeWidth={`${strokeWidth}px`}
      />
      <circle
        className={styles.progress}
        cx={sqSize / 2}
        cy={sqSize / 2}
        r={radius}
        strokeWidth={`${strokeWidth}px`}
        transform={`rotate(-90 ${sqSize / 2} ${sqSize / 2})`}
        style={{
          strokeDasharray: dashArray,
          strokeDashoffset: dashOffset,
        }}
      />
      <text className={styles.percent} x='50%' y='45%' dy='.3em' textAnchor='middle'>
        {`${percentage}%`}
      </text>
      <text className={styles.text} x='50%' y='60%' dy='.3em' textAnchor='middle'>
        Tasks completed
      </text>
    </svg>
  );
};
