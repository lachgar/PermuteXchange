import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate  } from 'react-router-dom';
import FilterData from './FilterData';
import FileForm from './FileForm';
import Header from './Header';
import Dashboard from './Dashboard';
import "./App.css";
import ProfesseursContext from './ProfesseursContext';
import Footer from './Footer';
import GraphContainer from './GraphContainer';
import ForgotPassword from './ForgotPassword';
import ResetPasswordPage from './ResetPasswordPage';
import PlatformDescription from './PlatformDescription';


function App() {
  const [dataP, setDataP] = useState([]);

  const load = async () => {
    try {
      const response = await fetch('https://tiny-worm-nightgown.cyclic.app/professeurs');
      const data = await response.json();
      setDataP(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const PrivateRoute = ({ path, element }) => {
    // Check if the user is logged in
    const token = localStorage.getItem('token');
    // If the user is logged in, render the component
    // Otherwise, redirect to the login page
    return (token) ? element : <Navigate to="/" />;
  };

  return (
    <ProfesseursContext.Provider value={dataP}>
     
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/register" element={<FileForm />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route
              path="/filter"
              element={<PrivateRoute path="/filter" element={<FilterData />} />}
            />
            <Route
              path="/combine"
              element={<PrivateRoute path="/combine" element={<GraphContainer />} />}
            />
            <Route path="/about" element={<PlatformDescription />} />
          </Routes>
          
          <Footer />
        </BrowserRouter>
  
    </ProfesseursContext.Provider>
  );
};

export default App;