import LayoutNavigationBottom from '../components/layouts/LayoutNavigationBottom';
import Profile from '../components/Profile';

export default function ProfilePage() {
  return (
    <LayoutNavigationBottom>
      <div className="flex flex-col gap-4 px-2 lg:px-0">
        <Profile />
      </div>
    </LayoutNavigationBottom>
  );
}
