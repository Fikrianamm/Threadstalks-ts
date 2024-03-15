import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/store';
import LayoutNavigationBottom from '../components/layouts/LayoutNavigationBottom';
import ThreadList from '../components/ThreadList';
import HomeSekeleton from '../components/skeletons/HomeSekeleton';
import Filter from '../components/Filter';
import { asyncPopulateThreadsAndUsers } from '../store/threads/threadsSlice';

export default function HomePage() {
  const { isLoading, data } = useAppSelector((state) => state.threads);
  const [selectedFilter, setSelectedFilter] = useState('');
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.users);
  const authUser = useAppSelector((state) => state.authUser);
  const threadList = data.map((thread) => ({
    ...thread,
    users: users.find((user) => user.id === thread.ownerId),
    authUser: authUser.id,
  }));
  const filteredThreads = selectedFilter ? threadList.filter(
    (thread) => thread.category === selectedFilter,
  ) : threadList;

  function handleSetSelectedFilter(category:string) {
    setSelectedFilter(category);
  }
  function handleUnsetSelectedFilter() {
    setSelectedFilter('');
  }

  useEffect(() => {
    dispatch(asyncPopulateThreadsAndUsers());
  }, [dispatch]);

  return (
    <LayoutNavigationBottom>
      {isLoading ? <HomeSekeleton />
        : (
          <>
            <Filter
              onSetSelectedFilter={handleSetSelectedFilter}
              onUnsetSelectedFilter={handleUnsetSelectedFilter}
              filter={selectedFilter}
            />
            <ThreadList threadList={filteredThreads} />
          </>
        )}
    </LayoutNavigationBottom>
  );
}
