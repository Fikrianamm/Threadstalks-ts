import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md';
import { useAppDispatch } from '../hooks/store';
import { setTheme } from '../store/theme/themeSlice';

export default function ThemeSwitch(
  { theme, onSwitch }:
  { theme:'dark' | 'light', onSwitch:()=>void },
) {
  return (
    <button type="button" onClick={onSwitch} className="outline-none btn-nav" title="Change theme">
      {theme === 'dark' ? <MdOutlineLightMode size={24} /> : <MdOutlineDarkMode size={24} />}
    </button>
  );
}
