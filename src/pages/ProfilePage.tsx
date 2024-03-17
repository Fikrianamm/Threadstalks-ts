import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LayoutNavigationBottom from '../components/layouts/LayoutNavigationBottom';
import Profile from '../components/Profile';
import { useAppSelector } from '../hooks/store';

export default function ProfilePage() {
  const authUser = useAppSelector((state) => state.authUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (authUser.id === null) {
      navigate('/login');
    }
  }, [authUser, navigate]);

  return (
    <LayoutNavigationBottom>
      <div className="flex flex-col gap-4 px-2 lg:px-0">
        <Profile />
      </div>
    </LayoutNavigationBottom>
  );
}
