import ReactQuill from 'react-quill';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LayoutNavigationBack from '../components/layouts/LayoutNavigationBack';
import 'react-quill/dist/quill.bubble.css';
import useInput from '../hooks/useInput';
import { useAppDispatch } from '../hooks/store';
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

  function handleCreate(e:FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(asyncCreateThread({ title, category, body }));
    navigate('/');
  }

  return (
    <LayoutNavigationBack>
      <h2 className="text-2xl font-bold mb-4">Buat thread baru</h2>
      <form onSubmit={(event) => handleCreate(event)} className="flex flex-col gap-4 md:w-[432px] w-80">
        <input type="text" className="input w-full" placeholder="Title" value={title} onChange={onChangeTitle} />
        <input type="text" className="input w-full" placeholder="Category (opsional)" value={category} onChange={onChangeCategory} />
        <ReactQuill modules={modules} theme="bubble" placeholder="Description..." className="input p-0 py-2 w-full" value={body} onChange={onChangeBody} />
        <button type="submit" className="btn w-max p-2 px-4 ml-auto">Posting</button>
      </form>
    </LayoutNavigationBack>
  );
}
