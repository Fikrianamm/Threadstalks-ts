import { useNavigate } from 'react-router-dom';
import { FormEvent } from 'react';
import Button from '../components/Button';
import LayoutNavigationBack from '../components/layouts/LayoutNavigationBack';
import { useAppDispatch } from '../hooks/store';
import useInput from '../hooks/useInput';
import { asyncSetAuthUser } from '../store/authUser/authUserSlice';

export default function LoginPage() {
  const [email, onChangeEmail] = useInput();
  const [password, onChangePassword] = useInput();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function handleLogin(e:FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(asyncSetAuthUser({ email, password }));
    navigate('/');
  }

  return (
    <LayoutNavigationBack>
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-bold text-center">Masuk ke akun Anda</h3>
        <form onSubmit={(event) => handleLogin(event)} className="flex flex-col gap-2">
          <input type="text" className="input" placeholder="Email" value={email} onChange={onChangeEmail} required />
          <input type="password" className="input" placeholder="Password" value={password} onChange={onChangePassword} required />
          <Button>Login</Button>
        </form>
      </div>
    </LayoutNavigationBack>
  );
}
