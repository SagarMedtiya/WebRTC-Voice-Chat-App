import './App.css';
import {  BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home/Home'
import Navigation from './components/shared/Navi/Navigation'
import Register from './pages/Register/Register'
import Login from './pages/Login/Login'
function App() {
  return (
    <BrowserRouter>
    <Navigation/>
      <Routes>
        <Route path='/' exact element={<Home/>}/>
      </Routes>
      <Routes>
        <Route path='/register' exact element={<Register/>}/>
      </Routes>
      <Routes>
        <Route path='/login' exact element={<Login/>}/>
      </Routes>
    </BrowserRouter>
   
  );
}

export default App;
