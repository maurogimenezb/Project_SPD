// Importa las bibliotecas y componentes necesarios
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Para realizar solicitudes HTTP
import './App.css';
import { ReactMic } from 'react-mic'; // Componente para grabar audio
import Button from '@mui/material/Button'; // Componente de botón de Material-UI
import CircularProgress from '@mui/material/CircularProgress'; // Componente de carga de Material-UI

function App() {
  // Estados para almacenar información y controlar la aplicación
  const [transcript, setTranscript] = useState(''); // Para la transcripción de audio
  const [transcribing, setTranscribing] = useState(false); // Para controlar si se está transcribiendo
  const [isRecording, setIsRecording] = useState(false); // Para controlar si se está grabando audio
  const [recordedBlobURL, setRecordedBlobURL] = useState(null); // Para almacenar la URL del audio grabado

  // Efecto que se ejecuta cuando cambia el estado 'transcribing'
  useEffect(() => {
    if (transcribing) {
      // Realiza una solicitud HTTP GET para obtener la transcripción de audio desde el servidor
      axios
        .get('http://localhost:8000/test-speech-to-text/')
        .then(response => {
          // Actualiza el estado 'transcript' con la transcripción obtenida
          setTranscript(response.data.transcript);
          // Finaliza la transcripción
          setTranscribing(false);
        })
        .catch(error => {
          // Maneja errores en caso de que la solicitud falle
          console.error('Error al obtener la transcripción:', error);
          // Finaliza la transcripción en caso de error
          setTranscribing(false);
        });
    }
  }, [transcribing]);

  // Maneja el clic en el botón de inicio de transcripción
  const handleTranscribeClick = () => {
    // Inicia la transcripción
    setTranscribing(true);
  };

  // Maneja el inicio de la grabación de audio
  const handleStartRecording = () => {
    // Activa la grabación de audio
    setIsRecording(true);
    // Reinicia la URL del audio grabado al comenzar una nueva grabación
    setRecordedBlobURL(null);
  };

  // Maneja el final de la grabación de audio
  const handleStopRecording = (recordedBlob) => {
    // Detiene la grabación de audio
    setIsRecording(false);
    // Muestra la información del audio grabado en la consola
    console.log('Audio grabado:', recordedBlob);
    // Almacena la URL del audio grabado en el estado
    setRecordedBlobURL(recordedBlob.blobURL);
  };

  // Renderiza la interfaz de usuario de la aplicación
  return (
    <div className="App">
      <h1>Texto Transcrito</h1>
      {/* Muestra la transcripción de audio */}
      <p>{transcript}</p>
      {/* Botón para iniciar la transcripción */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleTranscribeClick}
        disabled={transcribing || isRecording}
      >
        {transcribing ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          'Iniciar Transcripción'
        )}
      </Button>

      <h2>Grabador de Audio</h2>
      {/* Componente de grabación de audio */}
      <ReactMic
        record={isRecording}
        onStop={handleStopRecording}
        className="sound-wave"
      />
      <div className="record-controls">
        {/* Botón para iniciar la grabación */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleStartRecording}
          disabled={isRecording}
        >
          {isRecording ? 'Grabando...' : 'Iniciar Grabación'}
        </Button>
        {/* Botón para detener la grabación (aparece solo durante la grabación) */}
        {isRecording && (
          <Button
            variant="contained"
            color="secondary"
            onClick={handleStopRecording}
            className="stop-button"
          >
            Detener Grabación
          </Button>
        )}
      </div>

      {/* Reproductor de audio (aparece si hay audio grabado) */}
      {recordedBlobURL && (
        <div>
          <audio controls src={recordedBlobURL}></audio>
        </div>
      )}
    </div>
  );
}

export default App;
