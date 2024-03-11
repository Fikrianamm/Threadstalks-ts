import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/store';
import { asyncReceiveThreads } from '../store/threads/threadsSlice';
import LayoutNavigationBottom from '../components/layouts/LayoutNavigationBottom';

export default function HomePage() {
  const dispatch = useAppDispatch();
  const threads = useAppSelector((state) => state.threads);

  useEffect(() => {
    dispatch(asyncReceiveThreads());
  }, [dispatch]);

  return (
    <LayoutNavigationBottom>
      {threads && threads.map((thread) :React.ReactNode => (
        <div key={thread.id}>
          <h4>{thread.title}</h4>
          <p>{thread.body}</p>
          <p>{thread.category}</p>
          <p>{thread.totalComments}</p>
        </div>
      ))}
    </LayoutNavigationBottom>
  );
}
