import { FormEvent, useState } from 'react';
import ReactQuill from 'react-quill';
import useInput from '../hooks/useInput';
import { IThreadData } from '../types/threads';

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

export default function CreateInput(
  { onCreate } : {
    onCreate:(bodyThread:IThreadData) => void
  },
) {
  const [title, onChangeTitle] = useInput();
  const [category, onChangeCategory] = useInput();
  const [body, onChangeBody] = useState('');

  const bodyThread = {
    title,
    body,
    category,
  };

  function handleCreate(event:FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onCreate(bodyThread);
  }

  return (
    <form onSubmit={handleCreate} className="flex flex-col w-full gap-4">
      {/* <input type="text" className="w-full input" placeholder="Title" value={title} onChange={onChangeTitle} required /> */}
      <input type="text" className="w-full input" placeholder="Category (opsional)" value={category} onChange={onChangeCategory} />
      <ReactQuill modules={modules} theme="bubble" placeholder="Description..." className="w-full p-0 py-2 input" value={body} onChange={onChangeBody} />
      <button type="submit" className="p-2 px-4 ml-auto btn w-max">Posting</button>
    </form>
  );
}
