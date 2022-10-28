import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// OTRA OPCIÓN es usar useNavigate, y declararlo. Lo hice en la SERN.
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { AuthContext } from './context/AuthContext';
import { useContext } from 'react';

function App() {
  const { user } = useContext(AuthContext);
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            {/* Cuando estemos en / que se muestre Home */}
            <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
            {/* Navigate component does NOT allow to GO back on the browser */}
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
            <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
