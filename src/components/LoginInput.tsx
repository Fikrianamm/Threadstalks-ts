import { FormEvent } from 'react';
import useInput from '../hooks/useInput';
import { IUserCredentials } from '../types/user';

export default function LoginInput(
  { onLogin }:
  { onLogin:(loginData:IUserCredentials) => void },
) {
  const [email, onChangeEmail] = useInput();
  const [password, onChangePassword] = useInput();

  const loginData = {
    email: email.toLowerCase(),
    password,
  };

  function handleSubmit(event:FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onLogin(loginData);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2"
    >
      <input type="text" className="input" placeholder="Email" value={email} onChange={onChangeEmail} required />
      <input type="password" className="input" placeholder="Password" value={password} onChange={onChangePassword} required />
      <button type="submit" className="mt-2 btn">Login</button>
    </form>
  );
}
