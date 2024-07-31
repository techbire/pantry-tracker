import React, { useEffect, useRef } from 'react';
import Quagga from 'quagga';

const BarcodeScanner = ({ onDetected }) => {
  const scannerRef = useRef(null);

  useEffect(() => {
    Quagga.init({
      inputStream: {
        type: 'LiveStream',
        target: scannerRef.current,
        constraints: {
          facingMode: 'environment',
        },
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

    Quagga.onDetected((data) => {
      onDetected(data.codeResult.code);
    });

    return () => {
      Quagga.offDetected();
      Quagga.stop();
    };
  }, [onDetected]);

  return (
    <div ref={scannerRef} style={{ width: '100%', height: '400px', position: 'relative' }}>
      <canvas className="drawingBuffer" style={{ position: 'absolute', top: '0', left: '0' }} />
    </div>
  );
};

export default BarcodeScanner;
