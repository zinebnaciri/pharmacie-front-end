import React from 'react';


import StickyFooter from './Components/Footer';

import ResponsiveAppBar from './Components/Header';
import Grouped from './Components/UserInterface/main';

import { Route, Routes } from 'react-router-dom';
import Crud from './Components/adminInterface/VillesZones/CrudVille';
import CrudPharmacy from './Components/adminInterface/Pharmacies/CrudPharmacies';

import SignIn from './Components/adminInterface/Users/loginForm';





function App() {


  return (
    <div>
<ResponsiveAppBar />
    <Routes>
      <Route path="/" element={<SignIn />} />
    </Routes>
  
    <Routes>
      <Route path="/Home" element={<Grouped />} />
      <Route path="/AddVilles" element={<Crud />} />
      <Route path="/AddPharmacies" element={<CrudPharmacy />} />
    
    
    </Routes>
  
    <StickyFooter />
  </div>
  
  );
}


export default App;
