import { Home } from './pages/home';
import './App.css';


function App() {
  return (
    <div className="container">
      <h1 className="my-5 text-center">MERN Todos</h1>
      <div className='component-mount mb-5'>
        <Home/>
      </div>
    </div>
  );
}

export default App;
