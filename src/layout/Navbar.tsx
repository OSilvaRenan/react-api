import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Navbar.css';
import { IconContext } from 'react-icons';

function Navbar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
            <Link to='#' className='link'>
                <span>Opção 1</span>
            </Link>
            <Link to='#' className='link'>
                <span>Opção 2</span>
            </Link>
            <Link to='#' className='link'>
                <span>Opção 3</span>
            </Link>
          </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items'>
            <li className='navbar-toggle'>
              <Link to='#' className={ sidebar ? 'menu-bars' : 'menu-bars-icon'}>
              <FaIcons.FaBars onClick={showSidebar} />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return ( 
                sidebar ?
                <li key={index} className="nav-text">
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
                :
                <li key={index} className="nav-icon">
                  <Link to={item.path}>
                    {item.icon}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;