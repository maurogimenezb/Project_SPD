import React, { useState } from 'react';
import { ReactMic } from 'react-mic';
import audiobufferToWav from 'audiobuffer-to-wav';
import MicroButton from './MicroButton';  // Asegúrate de importar el componente MicroButton
import Navbar from './Navbar';

const App = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedBlobURL, setRecordedBlobURL] = useState(null);
  const [dictatedText, setDictatedText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');


  const handleStartRecording = () => {
    setIsRecording(true);
    setRecordedBlobURL(null);
    setDictatedText('');
  };

  const handleStopRecording = (recordedBlob) => {
    setIsRecording(false);
    console.log('Audio grabado:', recordedBlob);
    setRecordedBlobURL(recordedBlob.blobURL);
  };

  const convertToWavAndSend = async () => {
    if (!recordedBlobURL) {
      console.error('Grabe audio antes de convertir a WAV.');
      return;
    }

    try {
      // Obtén el archivo de audio convertido
      const response = await fetch(recordedBlobURL);
      const arrayBuffer = await response.arrayBuffer();
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
      const wavBlob = audiobufferToWav(audioBuffer);

      // Crea un objeto FormData y adjunta el archivo de audio
      const formData = new FormData();
      formData.append('audio', new Blob([wavBlob], { type: 'audio/wav' }), 'audio.wav');

      // Realiza la solicitud POST al backend
      const backendResponse = await fetch('http://127.0.0.1:8000/my_app/transcripcion/', {
        method: 'POST',
        body: formData,
      });

      const result = await backendResponse.json();

      // Actualiza el estado de la transcripción y muestra en pantalla
      setDictatedText(result.transcription);

      console.log('Archivo de audio enviado al backend con éxito.');
    } catch (error) {
      console.error('Error al convertir y enviar el archivo:', error);
    }
  };

  const translateText = async (text, targetLanguage) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/my_app/translate_${targetLanguage}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      if (response.ok) {
        const result = await response.json();
        setTranslatedText(result.texto_traducido);
      } else {
        console.error('Error al traducir el texto.');
      }
      setSelectedLanguage(targetLanguage);

    } catch (error) {
      console.error('Error de red:', error);
    }
  };

  const cardContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
  };

  const cardStyle = {
    border: '1px solid #ccc',
    borderRadius: '8px',
    width: '350px',
    height: '350px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    margin: '20px',
  };

  const buttonStyle = {
    margin: '5px',
    padding: '5px 10px',
    fontSize: '12px',
    cursor: 'pointer',
    color: 'white',
    backgroundColor: '#344955',
    border: 'none',
    borderRadius: '5px',
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ position: 'fixed', left: '50%', transform: 'translateX(-50%)', bottom: '130px' }}>
        <div style={cardContainerStyle}>
          <div className="mdc-card" style={cardStyle}>
            <div className="mdc-card__primary-action" tabIndex="0">
              <div className="mdc-card__ripple"></div>
              <div className="mdc-card__content">
                <h2>Transcripción</h2>
                <div>{dictatedText}</div>
              </div>
            </div>
          </div>

          <div className="mdc-card" style={cardStyle}>
            <div className="mdc-card__primary-action" tabIndex="0">
              <div className="mdc-card__ripple"></div>
              <div className="mdc-card__content">
                <h2>Traducción</h2>
                {translatedText}
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '10px' }}>
          <button style={{ ...buttonStyle, backgroundColor: selectedLanguage === 'en' ? '#faab1a' : '#344955' }} onClick={() => translateText(dictatedText, 'en')}>Inglés</button>
          <button style={{ ...buttonStyle, backgroundColor: '#344955' }}>Italiano</button>
          <button style={{ ...buttonStyle, backgroundColor: '#344955' }}>Portugués</button>
        </div>
        {/* Nuevo botón para convertir y enviar */}
        <button
            style={{ ...buttonStyle, backgroundColor: '#344955', marginTop: '10px' }}
            onClick={convertToWavAndSend}
            disabled={isRecording}
          >
            Enviar y Transcribir
          </button>
      </div>

      <div style={{ position: 'fixed', left: '50%', transform: 'translateX(-50%)', bottom: '20px', zIndex: 2 }}>
        <MicroButton
          onClick={isRecording ? handleStopRecording : handleStartRecording}
          isRecording={isRecording}
        />
      </div>

      <div style={{ marginTop: '50px', position: 'fixed', zIndex: 1 }}>
        <Navbar />
      </div>

      <div style={{ display: 'none' }}>
      <ReactMic
        record={isRecording}
        onStop={handleStopRecording}
        className="sound-wave"
      />
    </div>
    </div>
  );
};

export default App;
