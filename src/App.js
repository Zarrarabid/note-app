import { Route, Routes } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Main from './component/Main';

function App() {
  return (
    <div style={{
      minHeight:"100vh"
    }} className="App">
        <Routes>
          <Route path='/' element={<Main />} />
        </Routes>
     
    </div>
  );
}

export default App;
