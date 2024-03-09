import { ReactNode } from 'react';
import Navigation from '../Navigation';

function Header() {
  return (
    <div className="w-full flex justify-center items-center py-4 background text">
      <h1 className="font-oleoScript text-xl">Threadstalks</h1>
    </div>
  );
}

interface IProps {
  children: ReactNode
}

export default function LayoutNavigationBottom({ children }: IProps) {
  return (
    <div className="flex flex-col background text">
      <Header />
      <main className="flex-1 pb-20 pt-6 max-w-screen-sm mx-auto px-4">
        {children}
      </main>
      <Navigation />
    </div>
  );
}
