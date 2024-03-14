import moment from 'moment';
import parse from 'html-react-parser';
import { MdKeyboardDoubleArrowDown, MdKeyboardDoubleArrowUp } from 'react-icons/md';
import { useAppSelector } from '../hooks/store';
import Comment from './Comment';

export default function ThreadDetail() {
  const { data } = useAppSelector((state) => state.threadDetail);
  const parsedBody = data && parse(data.body);
  const createdAt = moment(data?.createdAt).fromNow();

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
          <p className="flex items-center gap-1 text-sm font-semibold transition-all cursor-pointer text-neutral-500 hover:text-green-600">
            <MdKeyboardDoubleArrowUp size={24} />
            {data?.upVotesBy.length}
          </p>
          <p className="flex items-center gap-1 text-sm font-semibold transition-all cursor-pointer text-neutral-500 hover:text-red-600">
            <MdKeyboardDoubleArrowDown size={24} />
            {data?.downVotesBy.length}
          </p>
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
