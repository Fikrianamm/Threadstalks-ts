import moment from 'moment';
import parse from 'html-react-parser';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../hooks/store';
import Comment from './Comment';
import Vote from './Vote';
import { threadDownVote, threadNeutralVote, threadUpVote } from '../store/threads/threadsSlice';
import { IVoteThread } from '../types/threads';

export default function ThreadDetail() {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.threadDetail);
  const authUser = useAppSelector((state) => state.authUser);
  const parsedBody = data && parse(data.body);
  const createdAt = moment(data?.createdAt).fromNow();
  const isVotedUp = data ? data.upVotesBy.includes(authUser.id as string) : false;
  const isVotedDown = data ? data.downVotesBy.includes(authUser.id as string) : false;
  const navigate = useNavigate();

  const idContent:IVoteThread = {
    idThread: data?.id as string,
    authUserId: authUser.id as string,
  };

  function handleVoteUp() {
    if (authUser.id === null) {
      toast.warning('Login dulu ya, kalo sudah baru bisa vote :) ');
      navigate('/login');
    } else if (data !== null) {
      if (isVotedUp) {
        dispatch(threadNeutralVote(idContent));
      } else {
        dispatch(threadUpVote(idContent));
      }
    }
  }

  function handleVoteDown() {
    if (authUser.id === null) {
      toast.warning('Login dulu ya, kalo sudah baru bisa vote :) ');
      navigate('/login');
    } else if (data !== null) {
      if (isVotedDown) {
        dispatch(threadNeutralVote(idContent));
      } else {
        dispatch(threadDownVote(idContent));
      }
    }
  }

  return (
    <>
      <div className="flex flex-col gap-3 pb-4 border-b md:gap-4 border-slate-200 dark:border-neutral-900">
        <div className="flex items-center gap-2">
          <img src={data?.owner.avatar} alt={data?.owner.name} className="w-6 h-6 rounded-full md:w-8 md:h-8" />
          <h4 className="text-sm font-semibold md:text-base">{data?.owner.name}</h4>
        </div>
        <div className="flex items-center gap-2">
          <p className="px-3 py-2 text-xs border rounded-md md:text-sm border-neutral-500">{data?.category}</p>
          <small className="text-xs md:text-sm text-neutral-500 dark:text-neutral-400">
            Posted
            {' '}
            {createdAt}
          </small>
        </div>
        <h2 className="text-xl font-bold md:text-2xl">{data?.title}</h2>
        <div className="text-sm md:text-base">
          {parsedBody}
        </div>
        <div className="flex items-center gap-4">
          <Vote
            onVote={handleVoteUp}
            isVoted={isVotedUp}
            type='voteUp'
          >
            {data?.upVotesBy.length}
          </Vote>
          <Vote
            onVote={handleVoteDown}
            isVoted={isVotedDown}
            type='voteDown'
          >
            {data?.downVotesBy.length}
          </Vote>
          <div className="flex items-center gap-1 text-sm font-semibold text-neutral-500">
            {data?.comments.length ? `${data?.comments.length} Balasan` : 'Belum ada balasan'}
          </div>
        </div>
      </div>
      {data?.comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </>
  );
}
