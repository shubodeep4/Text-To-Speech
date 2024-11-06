import React, { useState } from 'react';
import './TextToSpeech.css';

function TextToSpeech() {
  const [text, setText] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Function to handle the text-to-speech conversion
  const handleSpeak = () => {
    if (text.trim() === '') return; // Do nothing if input is empty

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);

    // Start speaking
    window.speechSynthesis.speak(utterance);
  };

  // Function to stop speech
  const handleStop = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  return (
    <div className="tts-container">
      <textarea
        placeholder="Enter text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows="4"
      />
      <div className="buttons">
        <button onClick={handleSpeak} disabled={isSpeaking}>
          {isSpeaking ? 'Speaking...' : 'Speak'}
        </button>
        <button onClick={handleStop} disabled={!isSpeaking}>
          Stop
        </button>
      </div>
    </div>
  );
}

export default TextToSpeech;
