import { INote } from 'src/types';

export function isNote(object: any): object is INote {
  return 'done' in object;
}
