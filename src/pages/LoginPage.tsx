import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import LayoutNavigationBack from '../components/layouts/LayoutNavigationBack';
import { REGISTER } from '../routes/routeConstant';
import LoginInput from '../components/LoginInput';
import { useAppDispatch, useAppSelector } from '../hooks/store';
import { asyncSetAuthUser } from '../store/authUser/authUserSlice';
import { IUserCredentials } from '../types/user';

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authUser = useAppSelector((state) => state.authUser);

  useEffect(() => {
    if (authUser.id !== null) {
      navigate('/');
    }
  }, [authUser, navigate]);

  async function handleLogin(loginData:IUserCredentials) {
    const { meta } = await dispatch(asyncSetAuthUser(loginData));
    if (meta.requestStatus !== 'rejected') navigate('/');
  }

  return (
    <LayoutNavigationBack>
      <div className="flex flex-col w-full gap-4 mx-auto max-w-80">
        <h3 className="text-lg font-bold text-center">Masuk ke akun Anda</h3>
        <LoginInput onLogin={handleLogin} />
        <p className="text-sm text-center text-neutral-500">
          Belum punya akun?
          {' '}
          <Link to={REGISTER} className="underline hover:text-neutral-600">Daftar di sini</Link>
        </p>
      </div>
    </LayoutNavigationBack>
  );
}
