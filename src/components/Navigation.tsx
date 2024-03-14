import { FaPlus } from 'react-icons/fa6';
import {
  MdChatBubbleOutline, MdLogin, MdOutlineLeaderboard, MdPersonOutline,
} from 'react-icons/md';
import { Link } from 'react-router-dom';
import {
  HOME, LEADERBOARDS, LOGIN, PROFILE, CREATETHREAD,
} from '../routes/routeConstant';
import ThemeSwitch from './ThemeSwitch';
import { useAppSelector } from '../hooks/store';

export default function Navigation() {
  const authUser = useAppSelector((state) => state.authUser);
  return (
    <div className="fixed bottom-0 w-full background bg-opacity-20 dark:bg-opacity-70 backdrop-blur-lg">
      <div className="flex items-center justify-center gap-6 py-3 text-neutral-500">
        <Link to={HOME} className="btn-nav" title="Threads">
          <MdChatBubbleOutline size={24} />
        </Link>
        <Link to={LEADERBOARDS} className="btn-nav" title="Leaderboards">
          <MdOutlineLeaderboard size={24} />
        </Link>
        <Link to={CREATETHREAD} className="btn-nav" title="New thread">
          <FaPlus size={24} />
        </Link>
        {authUser.id ? (
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
