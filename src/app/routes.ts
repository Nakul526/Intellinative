import { createBrowserRouter } from 'react-router';
import Root from './components/Root';
import Home from './pages/Home';
import About from './pages/About';
import Pillars from './pages/Pillars';
import Services from './pages/Services';
import Contact from './pages/Contact';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: 'about', Component: About },
      { path: 'pillars', Component: Pillars },
      { path: 'services', Component: Services },
      { path: 'contact', Component: Contact },
    ],
  },
]);
