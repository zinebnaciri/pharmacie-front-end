import React from 'react'
import ResponsiveAppBar from './Components/Header';
import Grouped from './Components/UserInterface/main';
import { Route, Routes } from 'react-router-dom';
import Crud from './Components/adminInterface/VillesZones/CrudVille';
import CrudPharmacy from './Components/adminInterface/Pharmacies/CrudPharmacies';
import Contact from './Components/contact';

export default function RoutesApp() {
  return (
    <div>
      <ResponsiveAppBar />
    <Routes> 
        <Route path='/'>
      <Route path="/Home" element={<Grouped />} />
      <Route path="/Cities" element={<Crud />} />
      <Route path="/Pharmacies" element={<CrudPharmacy />} />
      <Route path="/Support" element={<Contact />} />
     </Route>     
    
    </Routes>
    </div>
  )
}
