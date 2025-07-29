import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/common/Navbar';
import ForgotPassword from './pages/ForgotPassword';
import OpenRoute from './components/core/Auth/OpenRoute';
import Login from './pages/Login';
import Signup from './pages/Signup'
import VerifyEmail from './pages/verifyEmail';
import About from './pages/About';
import Contact from './pages/Contact';


function App() {
  return (
    <div className="app-wrapper">
      <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>} />

          <Route
            path='login'
            element={
              <OpenRoute>
                <Login/>
              </OpenRoute>
            }
          />

          <Route
            path='signup'
            element={
              <OpenRoute>
                <Signup/>
              </OpenRoute>
            }
          />

          <Route
            path='forgot-password'
            element={
              <OpenRoute>
                <ForgotPassword/>
              </OpenRoute>
            }
          />


          <Route
            path='verify-email'
            element={
              <OpenRoute>
                <VerifyEmail/>
              </OpenRoute>
            }
          />

          <Route
            path="/about"
            element={
              <About />
            }
          />   

          <Route path="/contact" element={<Contact />} />

        </Routes>
    </div>
  );
}

export default App;
