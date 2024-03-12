import { useEffect } from 'react';
import { useAppDispatch } from '../hooks/store';
import LayoutNavigationBottom from '../components/layouts/LayoutNavigationBottom';
import ThreadList from '../components/ThreadList';
import asyncPopulateThreadsAndUsers from '../store/shared/shared';

export default function HomePage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(asyncPopulateThreadsAndUsers());
  }, [dispatch]);

  return (
    <LayoutNavigationBottom>
      <ThreadList />
    </LayoutNavigationBottom>
  );
}
