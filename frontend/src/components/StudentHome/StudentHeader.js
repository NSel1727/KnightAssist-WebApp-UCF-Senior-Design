import React, { useState } from 'react';
import PageTitle from '../PageTitle';
import {BiMenu, BiHome, BiSearch, BiBell, BiHistory, BiCog, BiLogOut} from 'react-icons/bi';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { purple } from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';
import { CgProfile } from "react-icons/cg";
import { useNavigate } from 'react-router-dom'; 
import Logo from '../Logo';

function Header()
{
    let user = JSON.parse(localStorage.getItem('user-info'));
    const navigate = useNavigate();
    console.warn(user);

    function logOut() {
        // handle logOut logic
        // bring user to landing page
        localStorage.clear();
        navigate('/'); 
        
    }

    // customizing tooltip appearance
    const LightTooltip = styled(({ className, ...props }) => (
        <Tooltip {...props} classes={{ popper: className }} />
      ))(({ theme }) => ({
        [`& .${tooltipClasses.tooltip}`]: {
          backgroundColor: theme.palette.common.white,
          color: 'rgba(0, 0, 0, 0.87)',
          fontSize: 15,
          border: '1px solid #8C8C8C',
        },
    }));

    //customizing big log out button
    const LogOutButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    background: 'linear-gradient(45deg, #00785A 30%, #00785A 90%)',
    '&:hover': {
        background: 'linear-gradient(45deg, #008463 30%, #008463 80%)',
    },
    }));
    //customizing small log out button
    const SmallLogOutButton = styled(IconButton)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    background: 'linear-gradient(45deg, #00785A 30%, #00785A 90%)',
    '&:hover': {
        background: 'linear-gradient(45deg, #008463 30%, #008463 90%)',
    },
    }));

    const [isSidebarActive, setSidebarActive] = useState(false);
    const handleToggleSidebar = () => {
    setSidebarActive(!isSidebarActive);
    };

    return(
     <div>
        <div className={`sidebar ${isSidebarActive ? 'active' : ''}`}>
            <div className={`${isSidebarActive ? '' : 'moveLogoContent'} logo_content`}>
                <div className="logo">
                    <PageTitle mainStyle="headerTitleLogo" logoStyle="logoHeader" titleStyle="titleHeader"/>
                </div>
                <Logo theStyle={`menuIcon ${isSidebarActive ? 'logoSidebar' : 'moveLogo logoHeade'}`}/>
                <BiMenu onClick={() => handleToggleSidebar()} className='menuIcon'></BiMenu>
            </div>

            <ul className="nav_list">
                <li>
                    <LightTooltip title={!isSidebarActive ? "Home" : ""} placement="right" className="custom-tooltip">
                        <a href="#/studentprofile">
                            <CgProfile className='homeIcon'/>
                            <span class="links_name">Profile</span>
                        </a>
                    </LightTooltip>
                </li>
                <li>
                    <LightTooltip title={!isSidebarActive ? "Explore" : ""} placement="right" className="custom-tooltip">
                        <a href="#/explore">
                            <BiSearch className='searchIcon'></BiSearch>
                            <span class="links_name">Explore</span>
                        </a>
                    </LightTooltip>
                </li>
                <li>
                    <LightTooltip title={!isSidebarActive ? "History" : ""} placement="right" className="custom-tooltip">
                        <a href="#">
                            <BiHistory className='historyIcon'></BiHistory>
                            <span class="links_name">History</span>
                        </a>
                    </LightTooltip>
                </li>
                <li>
                    <LightTooltip title={!isSidebarActive ? "Settings" : ""} placement="right" className="custom-tooltip">
                        <a href="#">
                            <BiCog className='settingsIcon'></BiCog>
                            <span class="links_name">Settings</span>
                        </a>
                    </LightTooltip>
                </li>
            </ul>
            <div className="profile_content">
                <div className="profile">
                    <LightTooltip title={!isSidebarActive ? "Log Out" : ""} placement="right" className="custom-tooltip">
                            <LogOutButton className="bigLogOut" endIcon={<BiLogOut />} onClick={logOut}>
                                Sign Out
                            </LogOutButton>
                            <SmallLogOutButton className="smallLogOut" style={{borderRadius: 5}} onClick={logOut}>
                                <BiLogOut className="smallLogOutIcon" />
                            </SmallLogOutButton>
                    </LightTooltip>
                </div>
            </div>
        </div>
     </div>
    );
};

export default Header;