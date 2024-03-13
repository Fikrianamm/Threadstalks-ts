import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LayoutNavigationBack from '../components/layouts/LayoutNavigationBack';
import { useAppDispatch, useAppSelector } from '../hooks/store';
import { asyncReceiveThreadDetail, unsetThreadDetail } from '../store/threadDetail/threadDetailSlice';
import ThreadSkeleton from '../components/ThreadSkeleton';

export default function DetailPage() {
  const { isLoading, data } = useAppSelector((state) => state.threadDetail);
  const dispatch = useAppDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(asyncReceiveThreadDetail(id));
    }
    return () => {
      dispatch(unsetThreadDetail());
    };
  }, [dispatch, id]);

  return (
    <LayoutNavigationBack>
      {isLoading
        ? (
          <ThreadSkeleton />
        )
        : data?.title}
    </LayoutNavigationBack>
  );
}
