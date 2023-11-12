import React, { useState } from 'react';
import MicroButton from './MicroButton';
import Navbar from './Navbar';

const SpeechToText = () => {
  const [dictatedText, setDictatedText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const startDictation = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

    recognition.onstart = () => {
      setIsRecording(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setDictatedText(transcript);
      translateText(transcript);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognition.start();
  };

  const translateText = async (text, targetLanguage) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/translate_${targetLanguage}/`, {
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
        {/* Conjunto de Tarjetas */}
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
                <h2>Traducido</h2>
                <div>{translatedText}</div>
              </div>
            </div>
          </div>
        </div>
        {/* Fin del Conjunto de Tarjetas */}

        {/* Botones de Idioma */}
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '10px' }}>
          <button style={{ ...buttonStyle, backgroundColor: selectedLanguage === 'en' ? '#faab1a' : '#344955' }} onClick={() => translateText(dictatedText, 'en')}>Inglés</button>
          <button style={{ ...buttonStyle, backgroundColor: selectedLanguage === 'it' ? '#faab1a' : '#344955' }} onClick={() => translateText(dictatedText, 'it')}>Italiano</button>
          <button style={{ ...buttonStyle, backgroundColor: selectedLanguage === 'pt' ? '#faab1a' : '#344955' }} onClick={() => translateText(dictatedText, 'pt')}>Portugués</button>
        </div>
      </div>

      {/* MicroButton encima de Navbar */}
      <div style={{ position: 'fixed', left: '50%', transform: 'translateX(-50%)', bottom: '20px', zIndex: 2 }}>
        <MicroButton onClick={startDictation} isRecording={isRecording} />
      </div>

      {/* Navbar */}
      <div style={{ marginTop: '50px', position: 'fixed', zIndex: 1 }}>
        <Navbar />
      </div>
    </div>
  );
};

export default SpeechToText;
