import { createBrowserRouter } from 'react-router-dom';
import Signin from './components/signin';
import Dashboard from './routes/Dashboard';
import Header from './components/header';
import Signup from './components/signup';

export const router = createBrowserRouter([
    {path:"/", element: <Signin />},
    {path:"/dashboard", element: (<><Header /> <Dashboard /></>)},
    {path:"/signup", element: <Signup />}
]);