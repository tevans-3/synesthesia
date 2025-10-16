import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Home from './pages/Home';
import './index.css';

const router = createBrowserRouter([
  {
    element: <MainLayout/>,
    children: [
      { path: '/', element: <Home/>}
    ]
  }
]);
export default function App() {
  return (
      <RouterProvider router={router}/>
  );
}
