import { RiVipCrownLine } from 'react-icons/ri';
import { useAppSelector } from '../hooks/store';
import LeaderboardsItem from './LeaderboardsItem';

export default function Leaderboards() {
  const { data } = useAppSelector((state) => state.leaderboards);

  return (
    <>
      <div className="flex items-center gap-4">
        <h2 className="text-2xl font-bold">
          Top Votes
        </h2>
        <RiVipCrownLine size={24} className="text-yellow-500" />
      </div>
      <div className="flex flex-col gap-6 mt-6">
        {data && data.map((person, index) => (
          <LeaderboardsItem key={person.user.name} index={index} person={person} />
        ))}
      </div>
    </>

  );
}
