import HomePage from './Components/HomePage';
import { ParallaxProvider } from 'react-scroll-parallax';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import SignIn from './Components/SignIn';
import OTP from './Components/OTP';
import './App.css';
import SignUp from './Components/Signup';
import Seeker from './Components/Seeker';
import Error from './Components/Error';


function App() {
  return (
    <ParallaxProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/services" element={<HomePage />} />
          <Route path="/verifyotp" element={<OTP />} />
          <Route path="/error" element={<Error />} />
          <Route path="/seeker" element={<Seeker/>} />
        </Routes>
      </BrowserRouter>
    </ParallaxProvider>
  );
}

export default App;
