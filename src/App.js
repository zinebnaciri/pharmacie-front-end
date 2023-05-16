import React from 'react';


import StickyFooter from './Components/Footer';

import ResponsiveAppBar from './Components/Header';
import Grouped from './Components/UserInterface/main';

import { Route, Routes } from 'react-router-dom';
import Crud from './Components/adminInterface/VillesZones/CrudVille';
import CrudPharmacy from './Components/adminInterface/Pharmacies/CrudPharmacies';
import CrudUsers from './Components/adminInterface/Users/CrudUsers';
import Pharmacie from './Components/adminInterface/Pharmacies/pharmaciess';
import SignIn from './Components/adminInterface/Users/loginForm';





function App() {


  return (
    <div>
    <Routes>
      <Route path="/" element={<SignIn />} />
    </Routes>
    {window.location.pathname !== "/" && <ResponsiveAppBar />} {/* Render the navigation bar conditionally */}
    <Routes>
      <Route path="/Home" element={<Grouped />} />
      <Route path="/AddVilles" element={<Crud />} />
      <Route path="/AddPharmacies" element={<CrudPharmacy />} />
      <Route path="/addUsers" element={<CrudUsers />} />
      <Route path="/pharmaciesAnas" element={<Pharmacie />} />
    </Routes>
  
    <StickyFooter />
  </div>
  
  );
}


export default App;
