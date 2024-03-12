import { ReactNode } from 'react';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  return (
    <div className="w-full flex justify-center items-center py-4 background text">
      <div className="max-w-screen-sm w-full flex gap-6 justify-start items-center px-4">
        <IoMdArrowRoundBack size={28} onClick={() => navigate('/')} className="hover:opacity-80 cursor-pointer" />
        <h1 className="font-oleoScript text-2xl cursor-default">Threadstalks</h1>
      </div>
    </div>
  );
}

interface IProps {
  children: ReactNode
}

export default function LayoutNavigationBack({ children }: IProps) {
  return (
    <div className="min-h-dvh flex flex-col background text">
      <Header />
      <main className="flex-1 pb-20 pt-6 max-w-screen-sm mx-auto px-4">
        {children}
      </main>
    </div>
  );
}
