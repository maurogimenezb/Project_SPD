import React from 'react';

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
  };

  return (
    <div style={drawerStyle}>
      {/* Agrega el contenido del Drawer aquí */}
    </div>
  );
};

export default NavigationDrawer;
