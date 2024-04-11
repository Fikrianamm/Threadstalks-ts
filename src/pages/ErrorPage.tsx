import { MdErrorOutline } from 'react-icons/md';
import LayoutNavigationBack from '../components/layouts/LayoutNavigationBack';

export default function ErrorPage() {
  return (
    <LayoutNavigationBack>
      <div className="flex flex-col items-center justify-center gap-4 mt-20">
        <MdErrorOutline size={50} />
        <h3 className="text-2xl font-bold">Error, Page Not Found!</h3>
      </div>
    </LayoutNavigationBack>
  );
}
