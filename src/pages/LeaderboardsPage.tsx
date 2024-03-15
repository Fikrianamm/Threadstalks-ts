import { useEffect } from 'react';
import LayoutNavigationBottom from '../components/layouts/LayoutNavigationBottom';
import { useAppDispatch, useAppSelector } from '../hooks/store';
import { asyncReceiveLeaderboards } from '../store/leaderboards/leaderboardsSlice';
import LeaderboardsSekeleton from '../components/skeletons/LeaderboardsSekeleton';
import Leaderboards from '../components/Leaderboards';

export default function LeaderboardsPage() {
  const { isLoading } = useAppSelector((state) => state.leaderboards);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(asyncReceiveLeaderboards());
  }, [dispatch]);

  return (
    <LayoutNavigationBottom>
      {isLoading ? <LeaderboardsSekeleton /> : <Leaderboards />}
    </LayoutNavigationBottom>
  );
}
