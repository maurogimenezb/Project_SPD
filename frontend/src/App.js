import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Importa la biblioteca Axios para realizar solicitudes HTTP
import './App.css';
import { ReactMic } from 'react-mic'; // Importa el componente de grabación de audio

function App() {
  // Estado para almacenar la transcripción de audio
  const [transcript, setTranscript] = useState('');
  // Estado para controlar si la transcripción está en proceso
  const [transcribing, setTranscribing] = useState(false);
  // Estado para controlar si se está grabando audio
  const [isRecording, setIsRecording] = useState(false);
  // Estado para almacenar la URL del audio grabado
  const [recordedBlobURL, setRecordedBlobURL] = useState(null);

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

  return (
    <div className="App">
      <h1>Texto Transcrito</h1>
      {/* Muestra la transcripción de audio */}
      <p>{transcript}</p>
      {/* Botón para iniciar la transcripción */}
      <button onClick={handleTranscribeClick} disabled={transcribing || isRecording}>
        {transcribing ? 'Transcribiendo...' : 'Iniciar Transcripción'}
      </button>

      <h2>Grabador de Audio</h2>
      {/* Componente de grabación de audio */}
      <ReactMic
        record={isRecording}
        onStop={handleStopRecording}
        className="sound-wave"
      />
      <div className="record-controls">
        {/* Botón para iniciar la grabación */}
        <button onClick={handleStartRecording} disabled={isRecording}>
          {isRecording ? 'Grabando...' : 'Iniciar Grabación'}
        </button>
        {/* Botón para detener la grabación (aparece solo durante la grabación) */}
        {isRecording && (
          <button onClick={handleStopRecording} className="stop-button">
            Detener Grabación
          </button>
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
