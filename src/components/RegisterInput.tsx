import { FormEvent } from 'react';
import useInput from '../hooks/useInput';
import { IUserRegisterData } from '../types/user';

export default function RegisterInput(
  { onRegister } :
  { onRegister: (registerData: IUserRegisterData) => void },
) {
  const [name, onChangeName] = useInput();
  const [email, onChangeEmail] = useInput();
  const [password, onChangePassword] = useInput();

  const registerData = {
    name,
    email: email.toLowerCase(),
    password,
  };

  async function handleSubmit(e:FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onRegister(registerData);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <input type="text" className="input" placeholder="Name" value={name} onChange={onChangeName} required />
      <input type="text" className="input" placeholder="Email" value={email} onChange={onChangeEmail} required />
      <input type="password" className="input" placeholder="Password" value={password} onChange={onChangePassword} required />
      <button type="submit" className="mt-2 btn">Register</button>
    </form>
  );
}
