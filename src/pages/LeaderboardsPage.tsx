import { useEffect } from 'react';
import { RiVipCrownLine } from 'react-icons/ri';
import LayoutNavigationBottom from '../components/layouts/LayoutNavigationBottom';
import { useAppDispatch, useAppSelector } from '../hooks/store';
import { asyncReceiveLeaderboards } from '../store/leaderboards/leaderboardsSlice';

export default function LeaderboardsPage() {
  const dispatch = useAppDispatch();
  const leaderboards = useAppSelector((state) => state.leaderboards);

  useEffect(() => {
    dispatch(asyncReceiveLeaderboards());
  }, [dispatch]);

  return (
    <LayoutNavigationBottom>
      <div className="flex items-center gap-4">
        <h2 className="text-2xl font-bold">
          Top Votes
        </h2>
        <RiVipCrownLine size={24} className="text-yellow-500" />
      </div>
      <div className="mt-6 flex flex-col gap-6">
        {leaderboards && leaderboards.map((person, index) => (
          <div key={person.user.id} className="flex justify-between items-center font-semibold pl-4">
            <div className="flex items-center">
              <span className="text-lg">
                {index + 1}
                .
              </span>
              <img src={person.user.avatar} alt={person.user.name} className="rounded-full ml-4 mr-2 w-9 h-9" />
              <p>{person.user.name}</p>
            </div>
            <p>
              {person.score}
              {' '}
              <span className="text-xs font-normal">pts</span>
            </p>
          </div>
        ))}
      </div>
    </LayoutNavigationBottom>
  );
}
