import { Routes, Route } from 'react-router';
import LandingPage from '../pages/landing/LandingPage';
import LoginPage from '../pages/login/LoginPage';
import AboutPage from '../pages/about/AboutPage';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<LandingPage/>} />
            <Route path='/login' element={<LoginPage/>} />
            <Route path='/about' element={<AboutPage/>} />
        </Routes>
    )
}

export default AppRoutes