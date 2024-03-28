import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LayoutNavigationBack from '../components/layouts/LayoutNavigationBack';
import { LOGIN } from '../routes/routeConstant';
import { useAppDispatch, useAppSelector } from '../hooks/store';
import RegisterInput from '../components/RegisterInput';
import { asyncRegisterUser } from '../store/users/usersSlice';
import { IUserRegisterData } from '../types/user';

export default function RegisterPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authUser = useAppSelector((state) => state.authUser);

  useEffect(() => {
    if (authUser.id !== null) {
      navigate('/');
    }
  }, [authUser, navigate]);

  async function handleRegister(registerData:IUserRegisterData) {
    const { meta } = await dispatch(asyncRegisterUser(registerData));
    if (meta.requestStatus !== 'rejected') navigate('/login');
  }

  return (
    <LayoutNavigationBack>
      <div className="flex flex-col w-full gap-4 mx-auto max-w-80">
        <h3 className="text-lg font-bold text-center">Buat akun Anda</h3>
        <RegisterInput onRegister={handleRegister} />
        <p className="text-sm text-center text-neutral-500">
          Sudah punya akun?
          {' '}
          <Link to={LOGIN} className="underline hover:text-neutral-600">Masuk di sini</Link>
        </p>
      </div>
    </LayoutNavigationBack>
  );
}
