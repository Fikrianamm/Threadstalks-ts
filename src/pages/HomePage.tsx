import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/states';
import { asyncReceiveThreads } from '../store/threads/threadsSlice';

export default function HomePage() {
  const dispatch = useAppDispatch();
  const threads = useAppSelector((state) => state.threads);

  useEffect(() => {
    dispatch(asyncReceiveThreads());
  }, [dispatch]);

  return (
    <div>
      <h1 className="underline text-sky-500">Hello World</h1>
      {threads.data && threads.data.map((thread) :React.ReactNode => (
        <>
          <h4>{thread.title}</h4>
          <p>{thread.body}</p>
          <p>{thread.category}</p>
          <p>{thread.totalComments}</p>
        </>
      ))}
    </div>
  );
}
