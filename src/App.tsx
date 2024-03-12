import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import {
  CREATETHREAD,
  DETAILTHREAD,
  HOME, LEADERBOARDS, LOGIN, NOTFOUND, PROFILE, REGISTER,
} from './routes/routeConstant';
import HomePage from './pages/HomePage';
import { useAppDispatch, useAppSelector } from './hooks/store';
import Loading from './components/Loading';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ErrorPage from './pages/ErrorPage';
import CreatePage from './pages/CreatePage';
import ProfilePage from './pages/ProfilePage';
import LeaderboardsPage from './pages/LeaderboardsPage';
import { asyncPreloadProcess } from './store/isPreload/isPreloadSlice';
import 'react-toastify/dist/ReactToastify.css';
import DetailPage from './pages/DetailPage';

export default function App() {
  const theme = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  return (
    <>
      <Loading />
      <ToastContainer position="top-center" theme={theme} className="mt-8" />
      <Routes>
        <Route path={NOTFOUND} Component={ErrorPage} />
        <Route path={HOME} Component={HomePage} />
        <Route path={LOGIN} Component={LoginPage} />
        <Route path={REGISTER} Component={RegisterPage} />
        <Route path={CREATETHREAD} Component={CreatePage} />
        <Route path={DETAILTHREAD} Component={DetailPage} />
        <Route path={LEADERBOARDS} Component={LeaderboardsPage} />
        <Route path={PROFILE} Component={ProfilePage} />
      </Routes>
    </>
  );
}
