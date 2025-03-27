import HomePage from './Components/HomePage';
import { ParallaxProvider } from 'react-scroll-parallax';
function App() {
  return (
    <ParallaxProvider>
      <div className="bg-black  h-full w-full flex-col justify-start items-center m-0">
          <HomePage/>
      </div>
    </ParallaxProvider>
  );
}

export default App;
