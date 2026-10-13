import { Routes, Route } from 'react-router-dom';
import { Home } from './app/screens/screens';
import { ROUTES } from './app/routes';

function App() {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<Home />} />
    </Routes>
  );
}

export default App;
