import React, { useState } from 'react';

const ReadMidiFile = () => {
  const [log, setLog] = useState('no file selected');
  const [player, setPlayer] = useState(null);
  const [playing, setPlaying] = useState(false);

  const report = (s) => () => {
    setLog(s);
  };

  const clear = () => {
    if (player) player.stop();
    setPlaying(false);
    setLog('please wait...');
  };

  const load = (data, name) => {
    try {
      const newPlayer = JZZ.MIDI.SMF(data).player();
      newPlayer.connect(out);
      newPlayer.onEnd = () => {
        setPlaying(false);
      };
      setPlayer(newPlayer);
      setPlaying(true);
      newPlayer.play();
      setLog(name);
    } catch (e) {
      setLog(e);
    }
  };

  const playStop = () => {
    if (playing) {
      player.stop();
      setPlaying(false);
    } else {
      player.play();
      setPlaying(true);
    }
  };

  const fromFile = () => {
    if (window.FileReader) {
      clear();
      const reader = new FileReader();
      const f = document.getElementById('file').files[0];
      reader.onload = (e) => {
        let data = '';
        const bytes = new Uint8Array(e.target.result);
        for (let i = 0; i < bytes.length; i++) {
          data += String.fromCharCode(bytes[i]);
        }
        load(data, f.name);
      };
      reader.readAsArrayBuffer(f);
    } else {
      setLog('File API is not supported in this browser.');
    }
  };

  const fromURL = () => {
    clear();
    const url = document.getElementById('url').value;
    try {
      const xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = () => {
        if (xhttp.readyState === 4) {
          if (xhttp.status === 200) {
            let r, i;
            let data = '';
            r = xhttp.response;
            if (r instanceof ArrayBuffer) {
              r = new Uint8Array(r);
              for (i = 0; i < r.length; i++) data += String.fromCharCode(r[i]);
            } else { // for really antique browsers
              r = xhttp.responseText;
              for (i = 0; i < r.length; i++) data += String.fromCharCode(r.charCodeAt(i) & 0xff);
            }
            load(data, url);
          } else {
            setLog('XMLHttpRequest error');
          }
        }
      };
      try {
        xhttp.responseType = 'arraybuffer';
      } catch (e) {}
      xhttp.overrideMimeType('text/plain; charset=x-user-defined');
      xhttp.open('GET', url, true);
      xhttp.send();
    } catch (e) {
      setLog('XMLHttpRequest error');
    }
  };

  const fromBase64 = () => {
    clear();
    load(JZZ.lib.fromBase64(data), 'Base64 data');
  };

  return (
    <div>
      <h1>Read MIDI File</h1>
      <h2>from file:</h2>
      <p><input type="file" id="file" size="80" onChange={fromFile} /></p>
      <h2>from URL:</h2>
      <form onSubmit={(e) => { e.preventDefault(); fromURL(); }}>
        <p><input type="text" id="url" size="80" /><input type="submit" value="Submit..." /></p>
      </form>
      <h2>from Base64 string: <button onClick={fromBase64}>Read...</button></h2>
      <p id="log">{log}</p>
      <p><button id="btn" onClick={playStop} disabled>Play</button></p>
    </div>
  );
};


export default ReadMidiFile;