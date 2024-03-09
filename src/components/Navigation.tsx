import { FaPlus } from 'react-icons/fa6';
import {
  MdChatBubbleOutline, MdLogin, MdOutlineLeaderboard, MdPersonOutline,
} from 'react-icons/md';
import { Link } from 'react-router-dom';
import {
  HOME, LEADERBOARDS, LOGIN, PROFILE, THREADCREATE,
} from '../routes/routeConstant';
import ThemeSwitch from './ThemeSwitch';
import { useAppSelector } from '../hooks/store';

export default function Navigation() {
  const { data } = useAppSelector((state) => state.authUser);
  return (
    <div className="w-full background bg-opacity-20 dark:bg-opacity-70 backdrop-blur-lg fixed bottom-0">
      <div className="flex gap-6 justify-center items-center py-3 text-neutral-500">
        <Link to={HOME} className="btn-nav" title="Threads">
          <MdChatBubbleOutline size={24} />
        </Link>
        <Link to={LEADERBOARDS} className="btn-nav" title="Leaderboards">
          <MdOutlineLeaderboard size={24} />
        </Link>
        <Link to={THREADCREATE} className="btn-nav" title="New thread">
          <FaPlus size={24} />
        </Link>
        {data ? (
          <Link to={PROFILE} className="btn-nav" title="Profile">
            <MdPersonOutline size={24} />
          </Link>
        ) : (
          <Link to={LOGIN} className="btn-nav" title="Login">
            <MdLogin size={24} />
          </Link>
        )}
        <ThemeSwitch />
      </div>
    </div>
  );
}
