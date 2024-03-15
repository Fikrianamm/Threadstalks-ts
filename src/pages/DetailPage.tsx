import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LayoutNavigationBack from '../components/layouts/LayoutNavigationBack';
import { useAppDispatch, useAppSelector } from '../hooks/store';
import { asyncReceiveThreadDetail, unsetThreadDetail } from '../store/threadDetail/threadDetailSlice';
import ThreadDetail from '../components/ThreadDetail';
import ThreadSkeleton from '../components/skeletons/ThreadSkeleton';

export default function DetailPage() {
  const { isLoading } = useAppSelector((state) => state.threadDetail);
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
        : <ThreadDetail />}
    </LayoutNavigationBack>
  );
}
