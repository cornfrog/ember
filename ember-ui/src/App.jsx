import './App.scss';
import "./assets/icons.scss";
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import ProfileProvider from './context/ProfileProvider';
import { EMBER_ROUTES } from './utils/routes';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

const App = () => {


  const appBrowserRoutes = EMBER_ROUTES.map((route) => {
    return (
      <Route
        key={route.routeKey}
        path={route.routePath}
        Component={route.RouteComponent}
      />
    )
  });

  return (
    <BrowserRouter>
      <ProfileProvider>
        <Navbar />
        <Routes>
          {appBrowserRoutes}
          <Route path='*' element={<Navigate to="/projects" replace />} />
        </Routes>
        <Footer />
      </ProfileProvider>
    </BrowserRouter>
  )
}

export default App
