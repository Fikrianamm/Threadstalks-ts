import { Link, useNavigate } from 'react-router-dom';
import { FormEvent } from 'react';
import LayoutNavigationBack from '../components/layouts/LayoutNavigationBack';
import { useAppDispatch } from '../hooks/store';
import useInput from '../hooks/useInput';
import { asyncSetAuthUser } from '../store/authUser/authUserSlice';
import { REGISTER } from '../routes/routeConstant';

export default function LoginPage() {
  const [email, onChangeEmail] = useInput();
  const [password, onChangePassword] = useInput();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const loginData = {
    email: email.toLowerCase(),
    password,
  };

  function handleLogin(e:FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(asyncSetAuthUser(loginData));
    navigate('/');
  }

  return (
    <LayoutNavigationBack>
      <div className="flex flex-col w-full gap-4 mx-auto max-w-80">
        <h3 className="text-lg font-bold text-center">Masuk ke akun Anda</h3>
        <form onSubmit={(event) => handleLogin(event)} className="flex flex-col gap-2">
          <input type="text" className="input" placeholder="Email" value={email} onChange={onChangeEmail} required />
          <input type="password" className="input" placeholder="Password" value={password} onChange={onChangePassword} required />
          <button type="submit" className="mt-2 btn">Login</button>
        </form>
        <p className="text-sm text-center text-neutral-500">
          Belum punya akun?
          {' '}
          <Link to={REGISTER} className="underline hover:text-neutral-600">Daftar di sini</Link>
        </p>
      </div>
    </LayoutNavigationBack>
  );
}
