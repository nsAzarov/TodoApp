import { Importance } from 'src/types';

export const mapProtoImportance = (val: number | undefined): Importance => {
  switch (val) {
    case 0:
      return Importance.Trivial;
    case 1:
      return Importance.Minor;
    case 2:
      return Importance.Serious;
    case 3:
      return Importance.Critical;
    case 4:
      return Importance.Blocker;
    default:
      return Importance.Trivial;
  }
};
