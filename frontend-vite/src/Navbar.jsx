import React, { useEffect, useState } from 'react';
import { MDCTopAppBar } from '@material/top-app-bar';
import '@material/top-app-bar/dist/mdc.top-app-bar.css';
import NavigationDrawer from './NavigationDrawer';

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const topAppBarElement = document.querySelector('.mdc-top-app-bar');
    const topAppBar = new MDCTopAppBar(topAppBarElement);

    return () => {
      topAppBar.destroy();
    };
  }, []);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
    console.log('Drawer is now:', isDrawerOpen ? 'Open' : 'Closed');
  };

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Work+Sans:wght@400&display=swap');
          .mdc-icon-button:focus {
            outline: none; // Evitar el resaltado al seleccionar un botón
          }
        `}
      </style>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'relative' }}>
        <header
          className="mdc-top-app-bar"
          style={{
            backgroundColor: '#344955',
            position: 'fixed',
            bottom: 0,
            width: '100%',
            left: 0,
            right: 0,
            margin: 'auto',
            zIndex: 1000,
          }}
        >
          <div className="mdc-top-app-bar__row">
            <section className="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
              <button
                className="material-icons mdc-top-app-bar__navigation-icon mdc-icon-button"
                aria-label="Open navigation menu"
                style={{ color: '#b4c1cc' }}
                onClick={toggleDrawer}
              >
                menu
              </button>
              <span
                className="mdc-top-app-bar__title"
                style={{
                  color: '#ffffff',
                  fontFamily: 'Work Sans, sans-serif',
                  marginLeft: '8px',
                }}
              >
                Ñe'ëmbohasa Web
              </span>
            </section>
            <section className="mdc-top-app-bar__section mdc-top-app-bar__section--align-end" role="toolbar">
              <button
                className="material-icons mdc-top-app-bar__action-item mdc-icon-button"
                aria-label="Search"
                style={{ color: '#b4c1cc' }}
              >
                search
              </button>
              <button
                className="material-icons mdc-top-app-bar__action-item mdc-icon-button"
                aria-label="Options"
                style={{ color: '#b4c1cc' }}
              >
                more_vert
              </button>
            </section>
          </div>
        </header>

        <NavigationDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
      </div>
    </>
  );
};

export default Navbar;
