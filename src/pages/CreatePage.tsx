import ReactQuill from 'react-quill';
import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import LayoutNavigationBack from '../components/layouts/LayoutNavigationBack';
import 'react-quill/dist/quill.bubble.css';
import useInput from '../hooks/useInput';
import { useAppDispatch, useAppSelector } from '../hooks/store';
import { asyncCreateThread } from '../store/threads/threadsSlice';

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ color: [] }, { background: [] }],
    [{ script: 'sub' }, { script: 'super' }],
    ['blockquote', 'code-block'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ align: [] }],
    ['link'],
    ['clean'],
  ],
};

export default function CreatePage() {
  const [title, onChangeTitle] = useInput();
  const [category, onChangeCategory] = useInput();
  const [body, onChangeBody] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authuser = useAppSelector((state) => state.authUser);

  function handleCreate(e:FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (body && title) {
      dispatch(asyncCreateThread({ title, category, body }));
      navigate('/');
      return;
    }
    toast.warning('Title and description required');
  }

  useEffect(() => {
    if (authuser.id === null) {
      toast.warning('Login dulu ya, kalo sudah baru bisa buat thread :) ');
      navigate('/login');
    }
  }, [authuser, navigate]);

  return (
    <LayoutNavigationBack>
      <h2 className="mb-4 text-2xl font-bold">Buat thread baru</h2>
      <form onSubmit={(event) => handleCreate(event)} className="flex flex-col w-full gap-4">
        <input type="text" className="w-full input" placeholder="Title" value={title} onChange={onChangeTitle} required />
        <input type="text" className="w-full input" placeholder="Category (opsional)" value={category} onChange={onChangeCategory} />
        <ReactQuill modules={modules} theme="bubble" placeholder="Description..." className="w-full p-0 py-2 input" value={body} onChange={onChangeBody} />
        <button type="submit" className="p-2 px-4 ml-auto btn w-max">Posting</button>
      </form>
    </LayoutNavigationBack>
  );
}
