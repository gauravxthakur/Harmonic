import { createBrowserRouter } from 'react-router-dom';
import Signin from './components/signin';
import Dashboard from './routes/Dashboard';

export const router = createBrowserRouter([
    {path:"/", element: <Signin />},
    {path:"/dashboard", element: <Dashboard />}
]);