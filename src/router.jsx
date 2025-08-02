import { createBrowserRouter } from 'react-router-dom';
import Signin from './components/signin';
import Dashboard from './routes/Dashboard';
import Signup from './components/signup';

export const router = createBrowserRouter([
    {path:"/", element: <Signin />},
    {path:"/dashboard", element: <Dashboard />},
    {path:"/signup", element: <Signup />}
]);


/**
Challenge:
* 1) Create a new route with path '/signup'
* 2) Set the element as the 'Signup.jsx' component
* 3) Save and test your path by navigating to '/signup'
*/