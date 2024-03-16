import moment from 'moment';
import parse from 'html-react-parser';
import { useParams } from 'react-router-dom';
import IComment from '../types/comments';
import VoteUp from './VoteUp';
import VoteDown from './VoteDown';
import { useAppDispatch, useAppSelector } from '../hooks/store';
import { asyncReceiveThreadDetail } from '../store/threadDetail/threadDetailSlice';
import { downVoteComment, neutralVoteComment, upVoteComment } from '../utils/api';

export default function Comment({ comment }:{ comment:IComment }) {
  const authUser = useAppSelector((state) => state.authUser);
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const parsedContent = parse(comment.content);
  const createdAt = moment(comment.createdAt).fromNow();
  const isVotedUp = comment.upVotesBy.includes(authUser.id as string);
  const isVotedDown = comment.downVotesBy.includes(authUser.id as string);

  function handleVoteUp() {
    if (isVotedUp) {
      neutralVoteComment(id as string, comment.id);
    } else {
      upVoteComment(id as string, comment.id);
    }
    dispatch(asyncReceiveThreadDetail(id as string));
  }

  function handleVoteDown() {
    if (isVotedDown) {
      neutralVoteComment(id as string, comment.id);
    } else {
      downVoteComment(id as string, comment.id);
    }
    dispatch(asyncReceiveThreadDetail(id as string));
  }

  return (
    <div className="flex w-full gap-3 py-4 md:gap-4 ">
      <img src={comment.owner.avatar} alt={comment.owner.name} className="w-10 h-10 rounded-full " />
      <div className="w-full ">
        <div className="flex items-center justify-between w-full">
          <h4 className="text-base font-semibold ">{comment.owner.name}</h4>
          <small className="text-xs md:text-sm text-neutral-500 dark:text-neutral-400">{createdAt}</small>
        </div>
        <div className="my-1 text-sm md:text-base">{parsedContent}</div>
        <div className="flex items-center gap-4">
          <VoteUp
            onVoteUp={handleVoteUp}
            isVotedUp={isVotedUp}
          >
            {comment.upVotesBy.length}
          </VoteUp>
          <VoteDown
            onVoteDown={handleVoteDown}
            isVotedDown={isVotedDown}
          >
            {comment.downVotesBy.length}
          </VoteDown>
        </div>
      </div>
    </div>
  );
}
