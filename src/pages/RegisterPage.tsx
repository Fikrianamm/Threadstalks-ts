import { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LayoutNavigationBack from '../components/layouts/LayoutNavigationBack';
import useInput from '../hooks/useInput';
import { LOGIN } from '../routes/routeConstant';
import { useAppDispatch } from '../hooks/store';
import { asyncRegisterUser } from '../store/users/usersSlice';

export default function RegisterPage() {
  const [name, onChangeName] = useInput();
  const [email, onChangeEmail] = useInput();
  const [password, onChangePassword] = useInput();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function handleRegister(e:FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(asyncRegisterUser({ name, email, password }));
    navigate('/login');
  }

  return (
    <LayoutNavigationBack>
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-bold text-center">Buat akun Anda</h3>
        <form onSubmit={(event) => handleRegister(event)} className="flex flex-col gap-2">
          <input type="text" className="input" placeholder="Name" value={name} onChange={onChangeName} required />
          <input type="text" className="input" placeholder="Email" value={email} onChange={onChangeEmail} required />
          <input type="password" className="input" placeholder="Password" value={password} onChange={onChangePassword} required />
          <button type="submit" className="btn mt-2">Register</button>
        </form>
        <p className="text-sm text-neutral-500 text-center">
          Sudah punya akun?
          {' '}
          <Link to={LOGIN} className="underline hover:text-neutral-600">Masuk di sini</Link>
        </p>
      </div>
    </LayoutNavigationBack>
  );
}
