import ReactQuill from 'react-quill';
import { useState } from 'react';
import { IoIosSend } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../hooks/store';
import { IUserProfile } from '../types/user';
import { asyncReceiveThreadDetail } from '../store/threadDetail/threadDetailSlice';
import { createComment } from '../utils/api';

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

export default function CommentForm() {
  const authUser = useAppSelector((state) => state.authUser) as IUserProfile;
  const { data } = useAppSelector((state) => state.threadDetail);
  const [body, onChangeBody] = useState('');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const commentData = {
    id: data?.id as string,
    data: {
      content: body as string,
    },
  };

  async function handleComment() {
    if (authUser.id === null) {
      toast.warning('Login dulu ya, kalo sudah baru bisa comment :) ');
      navigate('/login');
    } else {
      await createComment(commentData);
      dispatch(asyncReceiveThreadDetail(data?.id as string));
    }
  }

  return (
    <div className="fixed bottom-0 right-0 flex items-center justify-center w-full py-4 background">
      <div className="flex w-full max-w-screen-sm px-4">
        <div className="flex items-center w-full gap-2 px-3 py-1 rounded-full bg-neutral-200 dark:bg-neutral-800">
          {authUser.avatar
            && <img src={authUser.avatar} alt={authUser.name} className="w-8 h-8 rounded-full" />}
          <ReactQuill modules={modules} theme="bubble" placeholder="Balas..." className="flex-1 w-4/6 rounded-md" value={body} onChange={onChangeBody} />
          <button type="button" className="p-2 transition-all rounded-full hover:bg-neutral-300 dark:hover:bg-neutral-700" onClick={handleComment}>
            <IoIosSend size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
