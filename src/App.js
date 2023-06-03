import React from 'react';
import StickyFooter from './Components/Footer';
import ResponsiveAppBar from './Components/Header';
import Grouped from './Components/UserInterface/main';
import { Route, Routes } from 'react-router-dom';
import Crud from './Components/adminInterface/VillesZones/CrudVille';
import CrudPharmacy from './Components/adminInterface/Pharmacies/CrudPharmacies';
import SignIn from './Components/adminInterface/Users/loginForm';
import Contact from './Components/contact';
import Protected from './Protected';
import RoutesApp from './RoutesApp';

function App() {


  return (
    <div>
 
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/*" element={
        <Protected>
          <RoutesApp/>
        </Protected>
      } />
    </Routes>
 
  
    <StickyFooter />
  </div>
  
  );
}


export default App;
