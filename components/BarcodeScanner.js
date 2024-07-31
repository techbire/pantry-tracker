import { useState } from 'react';
import Quagga from 'quagga';

export default function BarcodeScanner({ onDetected }) {
  const [scanning, setScanning] = useState(false);

  const startScanner = () => {
    setScanning(true);
    Quagga.init({
      inputStream: {
        type: 'LiveStream',
        target: document.querySelector('#scanner-container'),
      },
      decoder: {
        readers: ['code_128_reader'],
      },
    }, (err) => {
      if (err) {
        console.error(err);
        return;
      }
      Quagga.start();
    });

    Quagga.onDetected((result) => {
      onDetected(result.codeResult.code);
      setScanning(false);
      Quagga.stop();
    });
  };

  return (
    <div>
      <button onClick={startScanner}>Start Barcode Scanner</button>
      {scanning && <div id="scanner-container"></div>}
    </div>
  );
}
