import moment from 'moment';
import parse from 'html-react-parser';
import { MdKeyboardDoubleArrowDown, MdKeyboardDoubleArrowUp } from 'react-icons/md';
import IComment from '../types/comments';

export default function Comment({ comment }:{ comment:IComment }) {
  const parsedContent = parse(comment.content);
  const createdAt = moment(comment.createdAt).fromNow();

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
          <p className="flex items-center gap-1 text-sm font-semibold transition-all cursor-pointer text-neutral-500 hover:text-green-600">
            <MdKeyboardDoubleArrowUp size={24} />
            {comment.upVotesBy.length}
          </p>
          <p className="flex items-center gap-1 text-sm font-semibold transition-all cursor-pointer text-neutral-500 hover:text-red-600">
            <MdKeyboardDoubleArrowDown size={24} />
            {comment.downVotesBy.length}
          </p>
        </div>
      </div>
    </div>
  );
}
