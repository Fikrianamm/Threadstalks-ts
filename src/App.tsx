import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { HOME } from './routes/routeConstant';
import HomePage from './pages/HomePage';
import { useAppSelector } from './hooks/store';
import Loading from './components/Loading';

function App() {
  const theme = useAppSelector((state) => state.theme);

  useEffect(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <>
      <Loading />
      <Routes>
        <Route path={HOME} Component={HomePage} />
        <Route path={HOME} Component={HomePage} />
        <Route path={HOME} Component={HomePage} />
      </Routes>
    </>
  );
}

export default App;
