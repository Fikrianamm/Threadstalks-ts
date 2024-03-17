import { ReactNode } from 'react';
import { MdKeyboardDoubleArrowUp } from 'react-icons/md';

export default function VoteUp(
  { onVoteUp, isVotedUp, children }:
  { onVoteUp:()=>void, isVotedUp: boolean, children:ReactNode },
) {
  return (
    <button type="button" onClick={onVoteUp} className={`flex items-center gap-1 text-sm font-semibold transition-all cursor-pointer hover:text-green-600 outline-none ${isVotedUp ? 'text-green-600' : 'text-neutral-500'}`}>
      <MdKeyboardDoubleArrowUp size={24} />
      {children}
    </button>
  );
}
