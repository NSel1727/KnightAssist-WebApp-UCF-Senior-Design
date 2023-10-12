import React from 'react';
import PageTitle from '../PageTitle';
import {LuLogOut} from 'react-icons/lu';
function Header()
{
    return(
     <div>
        <div className="orgNav">
            <nav className="navbar navbar-expand-lg navbar-light">
                <PageTitle mainStyle="headerTitleLogo" logoStyle="logoHeader" titleStyle="titleHeader"/>
                <a className="headerLink" href="">profile</a>
                <a className="headerLink" href="">home</a>
                <a className="headerLink" href="">about us</a>
                <a className="headerLink" href="">contact</a>
                <div className="bottom">
                    <button className='luWrapper'>
                        <LuLogOut className='logoutIcon' onClick={() => (console.log("log out"))}/>
                    </button>
                </div>
            </nav>
        </div>
     </div>
    );
};

export default Header;
