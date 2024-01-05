import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from '../components/Login/Login';

const LoginPage = (props) =>
{
    return(
      <div className="login">
        <Login setRole={props.setRole}/>
      </div>
    );
};

export default LoginPage;
