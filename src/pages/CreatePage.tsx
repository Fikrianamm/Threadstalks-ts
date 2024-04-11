import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import LayoutNavigationBack from '../components/layouts/LayoutNavigationBack';
import 'react-quill/dist/quill.bubble.css';
import { useAppDispatch, useAppSelector } from '../hooks/store';
import { asyncCreateThread } from '../store/threads/threadsSlice';
import CreateInput from '../components/CreateInput';
import { IThreadData } from '../types/threads';

export default function CreatePage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authUser = useAppSelector((state) => state.authUser);

  async function handleCreate(bodyThread : IThreadData) {
    if (bodyThread.body && bodyThread.title) {
      const { meta } = await dispatch(asyncCreateThread(bodyThread));
      if (meta.requestStatus !== 'rejected') navigate('/');
      return;
    }
    toast.warning('Title and description required');
  }

  useEffect(() => {
    if (authUser.id === null) {
      toast.warning('Login dulu ya, kalo sudah baru bisa buat thread :) ');
      navigate('/login');
    }
  }, [authUser, navigate]);

  return (
    <LayoutNavigationBack>
      <h2 className="mb-4 text-2xl font-bold">Buat thread baru</h2>
      <CreateInput onCreate={handleCreate} />
    </LayoutNavigationBack>
  );
}
