import React from 'react';


import StickyFooter from './Components/Footer';

import ResponsiveAppBar from './Components/Header';
import Grouped from './Components/UserInterface/main';

import { Route, Routes } from 'react-router-dom';
import Crud from './Components/adminInterface/VillesZones/CrudVille';
import CrudPharmacy from './Components/adminInterface/Pharmacies/CrudPharmacies';
import CrudUsers from './Components/adminInterface/Users/CrudUsers';
import Pharmacie from './Components/adminInterface/Pharmacies/pharmaciess';





function App() {


  return (
    <div>
      <ResponsiveAppBar />
      <Routes>
      <Route extract path='/' element={<Grouped />} />
        <Route extract path='/Home' element={<Grouped />} />
        <Route extract path='/AddVilles' element={<Crud />} />
        <Route extract path='/AddPharmacies' element={<CrudPharmacy />} />
        <Route extract path='/addUsers' element={<CrudUsers />} />
        <Route extract path='/pharmaciesAnas' element={<Pharmacie />} />
      </Routes>
      <StickyFooter />
    </div>
  );
}


export default App;
