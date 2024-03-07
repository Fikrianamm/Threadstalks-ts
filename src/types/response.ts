import ILeaderboard from './leaderboards';
import { IThreadDetail, IThreadItem } from './threads';
import { IUserProfile } from './user';

interface IResponse {
  status: 'success' | 'fail'
  message: string
  token?: string
  users?: IUserProfile[]
  user?: IUserProfile
  threads?: IThreadItem[]
  detailThread?: IThreadDetail
  leaderboards?: ILeaderboard<IUserProfile>[]
}

export default IResponse;
