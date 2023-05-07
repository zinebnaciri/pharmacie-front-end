import React from 'react';


import StickyFooter from './Components/Footer';

import ResponsiveAppBar from './Components/Header';
import Grouped from './Components/UserInterface/main';

import { Route, Routes } from 'react-router-dom';
import Crud from './Components/adminInterface/CrudVille';



function App() {


  return (
    <div>
      <ResponsiveAppBar />
      <Routes>
      <Route extract path='/' element={<Grouped />} />
        <Route extract path='/Home' element={<Grouped />} />
        <Route extract path='/Admin' element={<Crud />} />
      </Routes>
      <StickyFooter />
    </div>
  );
}


export default App;
