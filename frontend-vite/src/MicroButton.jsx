// MicroButton.jsx
import React, { useEffect, useRef, useState } from 'react';
import { MDCRipple } from '@material/ripple';
import '@material/fab/dist/mdc.fab.css';

const MicroButton = ({ onClick, isRecording }) => {
  const [originalButtonStyle, setOriginalButtonStyle] = useState(null);
  const fabRef = useRef(null);

  useEffect(() => {
    if (fabRef.current) {
      const fabRipple = new MDCRipple(fabRef.current);
      return () => {
        fabRipple.destroy();
      };
    }
  }, [fabRef]);

  useEffect(() => {
    if (fabRef.current) {
      if (isRecording) {
        setOriginalButtonStyle(fabRef.current.style);
      } else {
        setOriginalButtonStyle(null);
      }
    }
  }, [isRecording]);

  const buttonStyle = {
    backgroundColor: isRecording ? '' : (originalButtonStyle ? originalButtonStyle.backgroundColor : '#faab1a'),
  };

  const iconStyle = {
    color: isRecording ? '#FF0000' : '#000000',
  };

  const icon = isRecording ? 'graphic_eq' : 'mic_none';
  const graphicEqColor = isRecording ? '#FFFFFF' : '';

  return (
    <button
      ref={fabRef}
      className={`mdc-fab ${isRecording ? 'mdc-fab--recording' : ''}`}
      aria-label="Microphone"
      onClick={onClick}
      style={buttonStyle}
    >
      <div className="mdc-fab__ripple"></div>
      <span className="material-icons" style={{ ...iconStyle, color: icon === 'graphic_eq' ? graphicEqColor : iconStyle.color }}>
        {icon}
      </span>
    </button>
  );
};

export default MicroButton;
