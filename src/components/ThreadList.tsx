import { useAppSelector } from '../hooks/store';
import ThreadItem from './ThreadItem';

export default function ThreadList() {
  const threads = useAppSelector((state) => state.threads);
  const users = useAppSelector((state) => state.users);
  const authUser = useAppSelector((state) => state.authUser);
  const threadList = threads && threads.map((thread) => ({
    ...thread,
    users: users.find((user) => user.id === thread.ownerId),
    authUser: authUser.id,
  }));
  return (
    <div className="flex flex-col gap-3">
      { threadList.map((thread) => (
        <ThreadItem key={thread.id} thread={thread} />
      ))}
    </div>
  );
}
