import { ReactNode } from 'react';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center w-full py-4 background text">
      <div className="flex items-center justify-start w-full max-w-screen-sm gap-6 px-4">
        <IoMdArrowRoundBack size={28} onClick={() => navigate('/')} className="cursor-pointer hover:opacity-80" />
        <h1 className="text-2xl cursor-default font-oleoScript">Threadstalks</h1>
      </div>
    </div>
  );
}

interface IProps {
  children: ReactNode
}

export default function LayoutNavigationBack({ children }: IProps) {
  return (
    <div className="relative flex flex-col min-h-dvh background text">
      <Header />
      <main className="flex-1 w-full max-w-screen-sm px-4 pt-6 pb-20 mx-auto">
        {children}
      </main>
    </div>
  );
}
