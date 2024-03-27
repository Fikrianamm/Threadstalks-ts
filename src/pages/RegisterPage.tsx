import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LayoutNavigationBack from '../components/layouts/LayoutNavigationBack';
import { LOGIN } from '../routes/routeConstant';
import { useAppSelector } from '../hooks/store';
import RegisterInput from '../components/RegisterInput';

export default function RegisterPage() {
  const navigate = useNavigate();
  const authUser = useAppSelector((state) => state.authUser);

  useEffect(() => {
    if (authUser.id !== null) {
      navigate('/');
    }
  }, [authUser, navigate]);

  return (
    <LayoutNavigationBack>
      <div className="flex flex-col w-full gap-4 mx-auto max-w-80">
        <h3 className="text-lg font-bold text-center">Buat akun Anda</h3>
        <RegisterInput />
        <p className="text-sm text-center text-neutral-500">
          Sudah punya akun?
          {' '}
          <Link to={LOGIN} className="underline hover:text-neutral-600">Masuk di sini</Link>
        </p>
      </div>
    </LayoutNavigationBack>
  );
}
