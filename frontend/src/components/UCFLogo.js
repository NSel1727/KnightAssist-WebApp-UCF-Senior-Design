import React from 'react';
import './OrgPortal/Header';

const logo = require("./ucfLogo.jpg");

function UCFLogo()
{
   return(
     <img className="ucfLogo" src={logo}/>
   );
};

export default UCFLogo;
