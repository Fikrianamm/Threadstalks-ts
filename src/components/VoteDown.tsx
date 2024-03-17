import { ReactNode } from 'react';
import { MdKeyboardDoubleArrowDown } from 'react-icons/md';

export default function VoteDown(
  { onVoteDown, isVotedDown, children }:
  { onVoteDown:()=>void, isVotedDown:boolean, children:ReactNode },
) {
  return (
    <button type="button" onClick={onVoteDown} className={`flex items-center gap-1 text-sm font-semibold transition-all cursor-pointer  hover:text-red-600 outline-none ${isVotedDown ? 'text-red-600' : 'text-neutral-500'}`}>
      <MdKeyboardDoubleArrowDown size={24} />
      {children}
    </button>
  );
}
