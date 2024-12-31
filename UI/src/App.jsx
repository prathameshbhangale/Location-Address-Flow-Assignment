import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Register from './pages/register';
import Login from './pages/Login';
import toast, { Toaster } from 'react-hot-toast';


function App() {
  const [count, setCount] = useState(0)

  return (<>
    <Toaster position="top-center" reverseOrder={false} />  
  
    <Routes>
      <Route path='/' element={<Navbar />}></Route>
      <Route path='/register' element={<Register />}></Route>
      <Route path='/login' element={<Login />}></Route>
    </Routes>

  </>
  );
}

export default App
