// ... (código anterior)

import React, { useEffect, useState } from 'react';
import { MDCTopAppBar } from '@material/top-app-bar';
import '@material/top-app-bar/dist/mdc.top-app-bar.css';
import NavigationDrawer from './NavigationDrawer';

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);

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

  const toggleInfo = () => {
    setIsInfoOpen(!isInfoOpen);
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
                aria-label="Information"
                style={{ color: '#b4c1cc' }}
                onClick={toggleInfo}
              >
                info
              </button>
            </section>
          </div>
        </header>

        <NavigationDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />

        {isInfoOpen && (
          <div
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              padding: '20px',
              backgroundColor: '#fff',
              borderRadius: '8px',
              boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
              border: '2px solid #000',  // Bordes de color negro
              zIndex: 2000,
            }}
          >
            {/* Contenido del cuadro de información rápida */}
            <h3>Información Rápida</h3>
            <p>Creado por: Mauro Gimenez</p>
            <p>Estudiante de Ingeniería en Informática</p>
            <p>Universidad Católica - Campus Guairá</p>
            <p>Año 2024</p>
            <button onClick={toggleInfo} style={{ color: '#fff' }}>
              Cerrar
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;