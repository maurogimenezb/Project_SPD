import React from 'react';
import { Link } from 'react-router-dom';

const NavigationDrawer = ({ isOpen, onClose }) => {
  const drawerStyle = {
    width: '250px',
    height: '100%',
    backgroundColor: isOpen ? '#304049' : 'transparent',
    position: 'fixed',
    top: 0,
    left: isOpen ? 0 : '-250px',
    transition: 'left 0.3s ease',
    color: '#ffffff',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column', // Añadido para organizar los botones verticalmente
  };

  const buttonStyle = {
    color: '#ffffff',
    backgroundColor: 'transparent',
    border: '1px solid #ffffff',
    marginBottom: '10px', // Añadido espacio entre los botones
  };

  return (
    <div style={drawerStyle}>
      <p>Bienvenido</p>
      {/* Agrega otro botón para ir a la página principal */}
      <Link to="/TranscriptionPage" onClick={onClose} style={{ textDecoration: 'none' }}>
        <button style={buttonStyle}>
          Ir a Inicio
        </button>
      </Link>
      {/* Utiliza el componente Link para el botón de Historial */}
      <Link to="/HistorialPage" onClick={onClose} style={{ textDecoration: 'none' }}>
        <button style={buttonStyle}>
          Ir a Historial
        </button>
      </Link>
    </div>
  );
};

export default NavigationDrawer;
