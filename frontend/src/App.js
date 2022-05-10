import './App.css';
import {  BrowserRouter, Routes, Route,Navigate, useLocation} from 'react-router-dom';
import Home from './pages/Home/Home';
import Navigation from './components/shared/Navi/Navigation';
import Activate from './pages/Activate/Activate';
import Authenticate from './pages/Authenticate/Authenticate';
import Rooms from './pages/Rooms/Rooms';
const isAuth = false;
const user ={
    activated: true,
};

function App() {
    return (
        <BrowserRouter>
            <Navigation/>
            <Routes>
                <Route path='/' exact element={
                    <GuestRoute>
                        <Home/>
                    </GuestRoute>}/>
                <Route path="authenticate" element=
                    {<GuestRoute>
                        <Authenticate/>
                    </GuestRoute>}/>
                <Route path="activate" element={
                    <SemiProtectedRoute>
                        <Activate/>
                    </SemiProtectedRoute>
                }/>
                <Route path="rooms" element={
                    <ProtectedRoute>
                        <Rooms/>
                    </ProtectedRoute>
                }/>
            </Routes>
        </BrowserRouter>
  );
};

const GuestRoute = ({children})=>{
    const location = useLocation();
    if (isAuth) {
        return <Navigate to="/rooms" state={{ from: location }} />
    }
    return children;
};

const SemiProtectedRoute = ({children})=>{
    const location = useLocation();
    if (!isAuth) {
        return <Navigate to="/" state={{ from: location }} />;
    };
    if(isAuth && !user.activated){
        return children
    };
    return <Navigate to="/rooms" state={{ from: location }}/>;
};

const ProtectedRoute = ({children})=>{
    const location = useLocation();
    if (!isAuth) {
        return <Navigate to="/" state={{ from: location }} />;
    };
    if(isAuth && !user.activated){
        return <Navigate to="/activate" state={{ from: location }}/>
    };
    return children;
};
export default App;
