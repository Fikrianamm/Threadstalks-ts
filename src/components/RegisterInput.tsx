import { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../hooks/store';
import useInput from '../hooks/useInput';
import { asyncRegisterUser } from '../store/users/usersSlice';

export default function RegisterInput() {
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

  async function handleRegister(e:FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { meta } = await dispatch(asyncRegisterUser(registerData));
    if (meta.requestStatus !== 'rejected') navigate('/login');
  }

  return (
    <form onSubmit={(event) => handleRegister(event)} className="flex flex-col gap-2">
      <input type="text" className="input" placeholder="Name" value={name} onChange={onChangeName} required />
      <input type="text" className="input" placeholder="Email" value={email} onChange={onChangeEmail} required />
      <input type="password" className="input" placeholder="Password" value={password} onChange={onChangePassword} required />
      <button type="submit" className="mt-2 btn">Register</button>
    </form>
  );
}
