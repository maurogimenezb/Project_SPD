// MicroButton.jsx
import React, { useEffect, useState } from 'react';
import { MDCRipple } from '@material/ripple';
import '@material/fab/dist/mdc.fab.css';

const MicroButton = ({ onClick, isRecording }) => {
  const [originalButtonStyle, setOriginalButtonStyle] = useState(null);

  useEffect(() => {
    const fabRipple = new MDCRipple(document.querySelector('.mdc-fab'));
    return () => {
      fabRipple.destroy();
    };
  }, []);

  useEffect(() => {
    if (isRecording) {
      setOriginalButtonStyle(document.querySelector('.mdc-fab').style);
    } else {
      setOriginalButtonStyle(null);
    }
  }, [isRecording]);

  const buttonStyle = {
    backgroundColor: isRecording ? '' : (originalButtonStyle ? originalButtonStyle.backgroundColor : '#faab1a'),
  };

  const iconStyle = {
    color: '#000000',
  };

  return (
    <button
      className={`mdc-fab ${isRecording ? 'mdc-fab--recording' : ''}`}
      aria-label="Microphone"
      onClick={onClick}
      style={buttonStyle}
    >
      <div className="mdc-fab__ripple"></div>
      <span className="material-icons" style={iconStyle}>
        mic
      </span>
    </button>
  );
};

export default MicroButton;

