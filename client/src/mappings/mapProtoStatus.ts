import { Status } from '../types';

export const mapProtoStatus = (val: number | undefined): Status => {
  switch (val) {
    case 0:
      return Status.Todo;
    case 1:
      return Status.InProgress;
    case 2:
      return Status.InReview;
    case 3:
      return Status.Done;
    default:
      return Status.Todo;
  }
};
