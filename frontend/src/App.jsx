// function App() {
//   return <h1> Hello from App </h1>;
// }

// export default App;

import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import LoginFormModal from './components/LoginFormModal/LoginFormModal';
import * as sessionActions from './store/session';
import Navigation from './components/Navigation/Navigation';
import SignupFormModal from './components/SignupFormModal';
import { ModalProvider } from './context/Modal';

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <ModalProvider>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </ModalProvider>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <h1>Welcome!</h1>
      },
      {
        path: '/login',
        element: <LoginFormModal />
      },
      {
        path: "signup",
        element: <SignupFormModal />
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
