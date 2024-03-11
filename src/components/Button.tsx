import { ReactNode } from 'react';

interface IButton {
  children : ReactNode
}

export default function Button({ children }:IButton) {
  return (
    <button type="submit" className="bg-neutral-900 dark:bg-slate-50 hover:bg-neutral-800 dark:hover:bg-slate-200 transition-colors ease-in text-neutral-200 dark:text-neutral-800 rounded-lg text-sm font-semibold p-4 mt-2">{children}</button>
  );
}
