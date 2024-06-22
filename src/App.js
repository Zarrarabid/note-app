import { Route, Routes } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Main from './component/Main';
import "./App.css"
import { useState } from 'react';

function App() {
  const [theme, setTheme] = useState(true);

  const toggleTheme = () => {
      setTheme(!theme)
  }
  return (
    <div data-theme={theme ? "light" : "dark"} className="App">
        <Routes>
          <Route path='/' element={<Main toggleTheme={toggleTheme} theme={theme} />} />
        </Routes>
     
    </div>
  );
}

export default App;
