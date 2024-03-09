import { ReactNode } from 'react';

interface IButton {
  children : ReactNode
}

export default function Button({ children }:IButton) {
  return (
    <button type="submit" className="bg-slate-50 hover:bg-slate-200 transition-colors ease-in text-neutral-800 rounded-lg text-sm font-semibold p-4 mt-2">{children}</button>
  );
}
