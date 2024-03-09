import { FaPlus } from 'react-icons/fa6';
import {
  MdChatBubbleOutline, MdOutlineLeaderboard, MdPersonOutline,
} from 'react-icons/md';
import { Link } from 'react-router-dom';
import {
  HOME, LEADERBOARDS, PROFILE, THREADCREATE,
} from '../routes/routeConstant';
import ThemeSwitch from './ThemeSwitch';

export default function Navigation() {
  return (
    <div className="w-full background bg-opacity-90 backdrop-blur-sm fixed bottom-0">
      <div className="flex gap-6 justify-center items-center py-3 text-neutral-500">
        <Link to={HOME} className="btn-nav">
          <MdChatBubbleOutline size={24} />
        </Link>
        <Link to={LEADERBOARDS} className="btn-nav">
          <MdOutlineLeaderboard size={24} />
        </Link>
        <Link to={THREADCREATE} className="btn-nav">
          <FaPlus size={24} />
        </Link>
        <Link to={PROFILE} className="btn-nav">
          <MdPersonOutline size={24} />
        </Link>
        <ThemeSwitch />
      </div>
    </div>
  );
}
