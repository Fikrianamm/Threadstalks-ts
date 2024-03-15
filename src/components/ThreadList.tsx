import { IThreadList } from '../types/threads';
import ThreadItem from './ThreadItem';

export default function ThreadList({ threadList }:{ threadList:IThreadList[] }) {
  return (
    <div className="flex flex-col gap-3">
      { threadList.map((thread) => (
        <ThreadItem key={thread.id} thread={thread} />
      ))}
    </div>
  );
}
