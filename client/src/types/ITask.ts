import { Importance } from './Importance';
import { Status } from './Status';

export interface ITask {
  id: string;
  title: string;
  description: string;
  timeLeft: string;
  timeSpent: string;
  importance: Importance;
  status: Status;
}
