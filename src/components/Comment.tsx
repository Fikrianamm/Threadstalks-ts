import moment from 'moment';
import parse from 'html-react-parser';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import IComment from '../types/comments';
import Vote from './Vote';
import { useAppDispatch, useAppSelector } from '../hooks/store';
import {
  commentDownVote, commentNeutralVote, commentUpVote,
} from '../store/threadDetail/threadDetailSlice';
import { IVoteComment } from '../types/threads';

export default function Comment({ comment }:{ comment:IComment }) {
  const authUser = useAppSelector((state) => state.authUser);
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const parsedContent = parse(comment.content);
  const createdAt = moment(comment.createdAt).fromNow();
  const isVotedUp = comment.upVotesBy.includes(authUser.id as string);
  const isVotedDown = comment.downVotesBy.includes(authUser.id as string);
  const navigate = useNavigate();

  const idContent:IVoteComment = {
    idThread: id as string,
    idComment: comment.id,
    authUserId: authUser.id as string,
  };

  function handleVoteUp() {
    if (authUser.id === null) {
      toast.warning('Login dulu ya, kalo sudah baru bisa vote :) ');
      navigate('/login');
    } else if (isVotedUp) {
      dispatch(commentNeutralVote(idContent));
    } else {
      dispatch(commentUpVote(idContent));
    }
  }

  function handleVoteDown() {
    if (authUser.id === null) {
      toast.warning('Login dulu ya, kalo sudah baru bisa vote :) ');
      navigate('/login');
    } else if (isVotedDown) {
      dispatch(commentNeutralVote(idContent));
    } else {
      dispatch(commentDownVote(idContent));
    }
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
          <Vote
            onVote={handleVoteUp}
            isVoted={isVotedUp}
            type="voteUp"
          >
            {comment.upVotesBy.length}
          </Vote>
          <Vote
            onVote={handleVoteDown}
            isVoted={isVotedDown}
            type="voteDown"
          >
            {comment.downVotesBy.length}
          </Vote>
        </div>
      </div>
    </div>
  );
}
