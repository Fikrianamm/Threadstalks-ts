import moment from 'moment';
import { Link, useNavigate } from 'react-router-dom';
import parse from 'html-react-parser';
import { toast } from 'react-toastify';
import { IVoteThread, IThreadList } from '../types/threads';
import { useAppDispatch, useAppSelector } from '../hooks/store';
import {
  threadDownVote, threadNeutralVote, threadUpVote,
} from '../store/threads/threadsSlice';
import VoteUp from './VoteUp';
import VoteDown from './VoteDown';

export default function ThreadItem({ thread }:{ thread:IThreadList }) {
  const dispatch = useAppDispatch();
  const { id } = useAppSelector((state) => state.authUser);
  const parsedBody = parse(thread.body);
  const createdAt = moment(thread.createdAt).fromNow();
  const isVotedUp = thread.upVotesBy.includes(id as string);
  const isVotedDown = thread.downVotesBy.includes(id as string);
  const navigate = useNavigate();

  const idContent:IVoteThread = {
    idThread: thread.id,
    authUserId: id as string,
  };

  function handleVoteUp() {
    if (id === null) {
      toast.warning('Login dulu ya, kalo sudah baru bisa vote :) ');
      navigate('/login');
    } else if (isVotedUp) {
      dispatch(threadNeutralVote(idContent));
    } else {
      dispatch(threadUpVote(idContent));
    }
  }

  function handleVoteDown() {
    if (id === null) {
      toast.warning('Login dulu ya, kalo sudah baru bisa vote :) ');
      navigate('/login');
    } else if (isVotedDown) {
      dispatch(threadNeutralVote(idContent));
    } else {
      dispatch(threadDownVote(idContent));
    }
  }

  return (
    <div className="flex flex-col gap-2 pb-4 border-b border-slate-200 dark:border-neutral-900">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src={thread.users?.avatar} alt={thread.users?.name} className="rounded-full w-7 h-7" />
          <p className="text-xs font-semibold">{thread.users?.name}</p>
        </div>
        <small className="text-xs text-neutral-500">{createdAt}</small>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Link to={`/threads/${thread.id}`} className="text-base font-bold cursor-pointer hover:text-sky-600 line-clamp-2">{thread.title}</Link>
        <p className="p-2 text-xs border rounded-md border-neutral-500">{thread.category}</p>
      </div>
      <div className="text-sm text-slate-500 line-clamp-1">{parsedBody}</div>
      <div className="flex items-center gap-4">
        <VoteUp
          onVoteUp={handleVoteUp}
          isVotedUp={isVotedUp}
        >
          {thread.upVotesBy.length}
        </VoteUp>
        <VoteDown
          onVoteDown={handleVoteDown}
          isVotedDown={isVotedDown}
        >
          {thread.downVotesBy.length}
        </VoteDown>
        <Link to={`/threads/${thread.id}`} className="flex items-center gap-1 text-sm font-semibold cursor-pointer text-neutral-500">
          {thread.totalComments ? `${thread.totalComments} Balasan` : 'Belum ada balasan'}
        </Link>
      </div>
    </div>
  );
}
