import moment from 'moment';
import { MdKeyboardDoubleArrowDown, MdKeyboardDoubleArrowUp } from 'react-icons/md';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import { IThreadList } from '../types/threads';

export default function ThreadItem({ thread }:{ thread:IThreadList }) {
  const parsedBody = parse(thread.body);
  const createdAt = moment(thread.createdAt).fromNow();

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
        <p className="flex items-center gap-1 text-sm font-semibold transition-all cursor-pointer text-neutral-500 hover:text-green-600">
          <MdKeyboardDoubleArrowUp size={24} />
          {thread.upVotesBy.length}
        </p>
        <p className="flex items-center gap-1 text-sm font-semibold transition-all cursor-pointer text-neutral-500 hover:text-red-600">
          <MdKeyboardDoubleArrowDown size={24} />
          {thread.downVotesBy.length}
        </p>
        <Link to={`/threads/${thread.id}`} className="flex items-center gap-1 text-sm font-semibold cursor-pointer text-neutral-500">
          {thread.totalComments ? `${thread.totalComments} Balasan` : 'Belum ada balasan'}
        </Link>
      </div>
    </div>
  );
}
