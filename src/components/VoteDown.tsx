import { ReactNode } from 'react';
import { MdKeyboardDoubleArrowDown } from 'react-icons/md';

export default function VoteDown(
  { onVoteDown, isVotedDown, children }:
  { onVoteDown:()=>void, isVotedDown:boolean, children:ReactNode },
) {
  return (
    <button type="button" onClick={onVoteDown} className={`flex items-center gap-1 text-sm font-semibold transition-all cursor-pointer text-neutral-500 hover:text-red-600 ${isVotedDown && 'text-red-600'}`}>
      <MdKeyboardDoubleArrowDown size={24} />
      {children}
    </button>
  );
}
