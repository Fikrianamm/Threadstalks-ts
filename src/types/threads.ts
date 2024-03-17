import IComment from './comments';
import ISummary from './summary';
import { IUser, IUserProfile } from './user';

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

interface IThreadList extends IThreadItem {
  users: IUserProfile | undefined
  authUser: string | null
}

export interface IVoteThread {
  idThread:string
  authUserId?:string
}

export interface IVoteComment extends IVoteThread {
  idComment:string
}

export type {
  IThreadData,
  IThreadDetail,
  IThreadItem,
  IThreadList,
};
