import ISummary from './summary';
import { IUser } from './user';

interface IComment extends ISummary {
  content: string
  owner: IUser
}

export default IComment;
