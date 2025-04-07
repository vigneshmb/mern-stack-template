import { useRef, useState } from 'react';

let SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const getFullTranscript = (eventArray) => {
  let fullTranscript = '';
  let speechLength = eventArray.results.length;
  for (let i = 0; i < speechLength; i++) {
    fullTranscript += eventArray.results[i].transcript;
  }
  return fullTranscript;
};

export default function useSpeech() {
  const [data, setData] = useState('');
  const [error, setError] = useState('');

  let recordRef = useRef();

  recordRef.current = new SpeechRecognition();
  if (!recordRef.current) {
    setError('Speech is not supported');
  }

  recordRef.current.continuous = true;
  recordRef.current.interimResults = false;
  recordRef.current.maxAlternatives = 1;
  recordRef.current.lang = 'en-US';

  const recordStart = () => {
    recordRef.current.start();
  };

  const recordStop = () => {
    recordRef.current.stop();
  };

  recordRef.current.onresult = function (event) {
    let speechLength = event.results.length;
    let transcript =
      speechLength > 0
        ? speechLength > 1
          ? getFullTranscript(event)
          : event.results[0][0].transcript
        : '';

    setData(transcript);
  };

  return { data, error, recordStart, recordStop };
}
