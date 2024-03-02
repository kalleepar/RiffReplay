import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom/dist'
import './index.css'

import App from './App.jsx'
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import SingleChord from './pages/SingleChord';
import Profile from './pages/Profile';
import Error from './pages/Error';
import Piano from './pages/Piano';
import About from './pages/About.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    error: <Error />,
    children: [
      {
        index: true,
        element: <Home />
      }, {
        path: '/login',
        element: <Login />
      }, {
        path: '/signup',
        element: <Signup />
      }, {
        path: '/me',
        element: <Profile />
      }, {
        path: '/profiles/:profileId',
        element: <Profile />
      }, {
        path: '/Chords/:ChordId',
        element: <SingleChord />
      }, {
        path: '/piano',
        element: <Piano />
      }, {
        path: '/about',
        element: <About />
      }, {
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
