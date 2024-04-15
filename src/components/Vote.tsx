import { ReactNode } from 'react';
import { MdKeyboardDoubleArrowDown, MdKeyboardDoubleArrowUp } from 'react-icons/md';

export default function Vote(
  {
    onVote, isVoted, children, type = 'voteUp',
  }:
  { onVote:()=>void, isVoted: boolean, children:ReactNode, type:'voteUp' | 'voteDown' },
) {
  let voteClass;
  if (isVoted) {
    if (type === 'voteUp') {
      voteClass = 'text-green-600';
    } else {
      voteClass = 'text-red-600';
    }
  } else {
    voteClass = 'text-neutral-500';
  }

  return (
    <button
      type="button"
      onClick={onVote}
      className={`flex items-center gap-1 text-sm font-semibold transition-all cursor-pointer ${type === 'voteUp' ? 'hover:text-green-600' : 'hover:text-red-600'} outline-none ${voteClass}`}
    >
      {type === 'voteUp' ? <MdKeyboardDoubleArrowUp size={24} />
        : <MdKeyboardDoubleArrowDown size={24} /> }
      {children}
    </button>
  );
}
