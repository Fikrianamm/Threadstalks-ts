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

  const registerData = {
    name,
    email: email.toLowerCase(),
    password,
  };

  function handleRegister(e:FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(asyncRegisterUser(registerData));
    navigate('/login');
  }

  return (
    <LayoutNavigationBack>
      <div className="flex flex-col w-full gap-4 mx-auto max-w-80">
        <h3 className="text-lg font-bold text-center">Buat akun Anda</h3>
        <form onSubmit={(event) => handleRegister(event)} className="flex flex-col gap-2">
          <input type="text" className="input" placeholder="Name" value={name} onChange={onChangeName} required />
          <input type="text" className="input" placeholder="Email" value={email} onChange={onChangeEmail} required />
          <input type="password" className="input" placeholder="Password" value={password} onChange={onChangePassword} required />
          <button type="submit" className="mt-2 btn">Register</button>
        </form>
        <p className="text-sm text-center text-neutral-500">
          Sudah punya akun?
          {' '}
          <Link to={LOGIN} className="underline hover:text-neutral-600">Masuk di sini</Link>
        </p>
      </div>
    </LayoutNavigationBack>
  );
}
