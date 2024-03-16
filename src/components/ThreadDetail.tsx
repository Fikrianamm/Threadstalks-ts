import moment from 'moment';
import parse from 'html-react-parser';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/store';
import Comment from './Comment';
import VoteUp from './VoteUp';
import VoteDown from './VoteDown';
import { downVoteThread, neutralVoteThread, upVoteThread } from '../utils/api';
import { asyncReceiveThreadDetail } from '../store/threadDetail/threadDetailSlice';

export default function ThreadDetail() {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.threadDetail);
  const authUser = useAppSelector((state) => state.authUser);
  const { id } = useParams();
  const parsedBody = data && parse(data.body);
  const createdAt = moment(data?.createdAt).fromNow();
  const isVotedUp = data ? data.upVotesBy.includes(authUser.id as string) : false;
  const isVotedDown = data ? data.downVotesBy.includes(authUser.id as string) : false;

  function handleVoteUp() {
    if (data !== null) {
      if (isVotedUp) {
        neutralVoteThread(data.id);
      } else {
        upVoteThread(data.id);
      }
      dispatch(asyncReceiveThreadDetail(id as string));
    }
  }

  function handleVoteDown() {
    if (data !== null) {
      if (isVotedDown) {
        neutralVoteThread(data.id);
      } else {
        downVoteThread(data.id);
      }
      dispatch(asyncReceiveThreadDetail(id as string));
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
          <VoteUp
            onVoteUp={handleVoteUp}
            isVotedUp={isVotedUp}
          >
            {data?.upVotesBy.length}
          </VoteUp>
          <VoteDown
            onVoteDown={handleVoteDown}
            isVotedDown={isVotedDown}
          >
            {data?.downVotesBy.length}
          </VoteDown>
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
