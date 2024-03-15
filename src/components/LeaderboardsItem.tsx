import ILeaderboard from '../types/leaderboards';
import { IUserProfile } from '../types/user';

export default function LeaderboardsItem({ person, index }:{ person:ILeaderboard<IUserProfile>
  index: number }) {
  return (
    <div key={person.user.id} className="flex items-center justify-between pl-4 font-semibold">
      <div className="flex items-center">
        <span className="text-lg">
          {index + 1}
          .
        </span>
        <img src={person.user.avatar} alt={person.user.name} className="ml-4 mr-2 rounded-full w-9 h-9" />
        <p>{person.user.name}</p>
      </div>
      <p>
        {person.score}
        {' '}
        <span className="text-xs font-normal">pts</span>
      </p>
    </div>
  );
}
