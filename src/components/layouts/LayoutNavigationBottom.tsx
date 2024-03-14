import { ReactNode } from 'react';
import Navigation from '../Navigation';

function Header() {
  return (
    <div className="flex items-center justify-center w-full py-4 background text">
      <h1 className="text-xl cursor-default font-oleoScript">Threadstalks</h1>
    </div>
  );
}

interface IProps {
  children: ReactNode
}

export default function LayoutNavigationBottom({ children }: IProps) {
  return (
    <div className="flex flex-col min-h-dvh background text">
      <Header />
      <main className="flex-1 w-full max-w-screen-sm px-4 pt-6 pb-20 mx-auto">
        {children}
      </main>
      <Navigation />
    </div>
  );
}
