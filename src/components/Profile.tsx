import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SlOptions } from 'react-icons/sl';
import { useAppDispatch, useAppSelector } from '../hooks/store';
import { unsetAuthUser } from '../store/authUser/authUserSlice';
import { putAccessToken } from '../utils/api';
import { IUserProfile } from '../types/user';

export default function Profile() {
  const [showOptions, setShowOptions] = useState(false);
  const authUser = useAppSelector((state) => state.authUser) as IUserProfile;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function handleToggleOptions() {
    setShowOptions((cur) => !cur);
  }

  function handleLogout() {
    dispatch(unsetAuthUser());
    putAccessToken('');
    navigate('/');
  }

  return (
    <div className="flex gap-4">
      <img src={authUser.avatar} alt={authUser.name} className="rounded-full max-w-14 max-h-14 md:max-w-16 md:max-h-16" />
      <div className="flex justify-between w-full my-auto h-max">
        <div className="flex flex-col justify-start">
          <h3 className="text-sm font-bold capitalize md:text-base">{authUser.name}</h3>
          <p className="text-sm lowercase md:text-base">{authUser.email}</p>
        </div>
        <div className="relative">
          <SlOptions className="box-content p-1 mb-2 rounded-md hover:bg-neutral-200 dark:hover:bg-neutral-900" onClick={() => handleToggleOptions()} />
          {showOptions && (
          <div className="absolute right-0 px-4 py-2 text-sm font-semibold border rounded-md cursor-pointer border-neutral-600 hover:bg-neutral-200 dark:hover:bg-neutral-900 w-max" onClick={() => handleLogout()} role="button" tabIndex={0}>
            Logout
          </div>
          )}
        </div>
      </div>
    </div>
  );
}
