import { Routes, Route } from 'react-router-dom';
import { HOME } from './routes/routeConstant';
import HomePage from './pages/HomePage';

function App() {
  return (
    <Routes>
      <Route path={HOME} Component={HomePage} />
    </Routes>
  );
}

export default App;
