import moment from 'moment';
import { MdKeyboardDoubleArrowDown, MdKeyboardDoubleArrowUp } from 'react-icons/md';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import { IThreadList } from '../types/threads';

export default function ThreadItem({ thread }:{ thread:IThreadList }) {
  const parsedBody = parse(thread.body);
  return (
    <div className="flex flex-col gap-2 pb-4 border-b border-slate-200 dark:border-neutral-900">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img src={thread.users?.avatar} alt={thread.users?.name} className="rounded-full w-7 h-7" />
          <p className="text-xs font-semibold">{thread.users?.name}</p>
        </div>
        <small className="text-xs text-neutral-500">{moment(thread.createdAt).fromNow()}</small>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Link to={`/threads/${thread.id}`} className="text-base font-bold hover:text-sky-600 cursor-pointer">{thread.title}</Link>
        <p className="text-xs p-2 border border-neutral-500 rounded-md">{thread.category}</p>
      </div>
      <pre className="text-sm text-slate-500 line-clamp-1 font-openSans">{parsedBody}</pre>
      <div className="flex gap-4 items-center">
        <p className="flex gap-1 items-center text-sm font-semibold text-neutral-300 hover:text-green-600 transition-all cursor-pointer">
          <MdKeyboardDoubleArrowUp size={24} />
          {thread.upVotesBy.length}
        </p>
        <p className="flex gap-1 items-center text-sm font-semibold text-neutral-300 hover:text-red-600 transition-all cursor-pointer">
          <MdKeyboardDoubleArrowDown size={24} />
          {thread.downVotesBy.length}
        </p>
        <Link to={`/threads/${thread.id}`} className="flex gap-1 items-center text-xs font-semibold text-neutral-300 cursor-pointer">
          {thread.totalComments ? `${thread.totalComments} Balasan` : 'Belum ada balasan'}
        </Link>
      </div>
    </div>
  );
}
