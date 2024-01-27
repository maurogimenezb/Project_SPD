import React from 'react';
import { Link } from 'react-router-dom';

const WelcomePage = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '0 80px', // Ajusta el padding a tus necesidades
        position: 'relative',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '20px', maxWidth: '600px', color: 'white' }}>
        <h1>Bienvenido a Ñe'ëmbohasa Web</h1>
        <p>¡Gracias por usar nuestro servicio de transcripción!</p>
        <p>Comienza a transcribir tus audios a texto ahora.</p>
        {/* Agrega aquí cualquier otra información o elementos que desees mostrar */}
      </div>

      {/* Cuadro con bordes circulares detrás del texto y el botón */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100%',
          padding: '200px',  // Ajusta la altura aumentando el padding
          borderRadius: '20px',
          backgroundColor: '#344955', // Cambia el color aquí
          color: 'white',
          zIndex: -1,
        }}
      >
      </div>

      <div>
        <Link to="/TranscriptionPage" style={{ textDecoration: 'none' }}>
          <button
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              cursor: 'pointer',
              color: 'white',
              border: '1px solid white',
            }}
          >
            Ir a la página
          </button>
        </Link>
      </div>
    </div>
  );
};

export default WelcomePage;
