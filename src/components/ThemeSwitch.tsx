import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md';
import { useAppDispatch, useAppSelector } from '../hooks/store';
import { setTheme } from '../store/theme/themeSlice';

export default function ThemeSwitch() {
  const theme = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();

  function onSwitch() {
    const newTheme = theme !== 'dark' ? 'dark' : 'light';
    dispatch(setTheme(newTheme));
  }

  return (
    <button type="button" onClick={onSwitch} className="outline-none btn-nav" title="Change theme">
      {theme === 'dark' ? <MdOutlineLightMode size={24} /> : <MdOutlineDarkMode size={24} />}
    </button>
  );
}
