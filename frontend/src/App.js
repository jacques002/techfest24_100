import './App.scss';
import Router from './router.js';
import { BrowserRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
// eslint-disable-next-line

function App() {


  return (
    <div className="App">
      
        <BrowserRouter>
          
          <Router />
        </BrowserRouter>
        <ToastContainer />
        
    </div>
  );
}

export default App;
