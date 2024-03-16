import { ReactNode } from 'react';
import { MdKeyboardDoubleArrowUp } from 'react-icons/md';

export default function VoteUp(
  { onVoteUp, isVotedUp, children }:
  { onVoteUp:()=>void, isVotedUp: boolean, children:ReactNode },
) {
  return (
    <button type="button" onClick={onVoteUp} className={`flex items-center gap-1 text-sm font-semibold transition-all cursor-pointer text-neutral-500 hover:text-green-600 ${isVotedUp && 'text-green-600'}`}>
      <MdKeyboardDoubleArrowUp size={24} />
      {children}
    </button>
  );
}
