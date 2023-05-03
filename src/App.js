import React from 'react';


import StickyFooter from './Components/Footer';

import ResponsiveAppBar from './Components/Header';
import Grouped from './Components/UserInterface/main';



function App() {
 

  return (
    <div>
      <ResponsiveAppBar/>
     <Grouped/>
      <StickyFooter/>
    </div>
  );
}


export default App;
