import IComment from './comments';
import ISummary from './summary';
import { IUser } from './user';

interface IThreadItem extends IThreadData, ISummary {
  ownerId: string
  totalComments: number
}

interface IThreadData {
  title: string
  body: string
  category?: string
}

interface IThreadDetail extends IThreadData, ISummary {
  comments: IComment[]
  owner: IUser
}

export type {
  IThreadData,
  IThreadDetail,
  IThreadItem,
};
