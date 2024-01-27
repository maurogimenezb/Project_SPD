// HistorialPage.jsx
import React, { useEffect, useState } from 'react';
import Navbar from '../componentes/Navbar';

const HistorialPage = () => {
  const [historial, setHistorial] = useState([]);

  useEffect(() => {
    // Hacer una solicitud para obtener el historial desde tu backend
    fetch('http://127.0.0.1:8000/my_app/obtener_historial/')  // Reemplaza con tu endpoint real
      .then(response => response.json())
      .then(data => setHistorial(data))
      .catch(error => console.error('Error al obtener el historial:', error));
  }, []);

  const limpiarHistorial = () => {
    // Hacer una solicitud para limpiar la base de datos
    fetch('http://127.0.0.1:8000/my_app/limpiar_historial/', { method: 'DELETE' })  // Reemplaza con tu endpoint real y método adecuado
      .then(response => {
        if (response.ok) {
          console.log('Historial limpiado con éxito');
          // Actualizar el estado local después de limpiar la base de datos
          setHistorial([]);
        } else {
          console.error('Error al limpiar el historial');
        }
      })
      .catch(error => console.error('Error al limpiar el historial:', error));
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginTop: '50px', position: 'fixed', zIndex: 1 }}>
        <Navbar />
      </div>
      <div style={{ maxWidth: '800px', margin: 'auto' }}>
        <h2 style={{ marginBottom: '20px' }}>Historial de Transcripciones</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {historial.map(item => (
            <div key={item.id} style={{ flex: '1 0 21%', marginBottom: '20px', marginRight: '1%' }}>
              <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
                <h3 style={{ marginBottom: '8px', color: '#333' }}>Texto:</h3>
                <p style={{ fontSize: '18px', lineHeight: '1.6' }}>{item.texto}</p>
                <h3 style={{ marginBottom: '8px', color: '#333' }}>Traducción:</h3>
                <p style={{ fontSize: '18px', lineHeight: '1.6' }}>{item.traduccion}</p>
                {/* Otros campos y estilos según tus necesidades */}
              </div>
            </div>
          ))}
        </div>
        <button onClick={limpiarHistorial} style={{ marginTop: '20px', color: 'white' }}>
          Limpiar Historial
        </button>
      </div>
    </div>
  );
};

export default HistorialPage;
