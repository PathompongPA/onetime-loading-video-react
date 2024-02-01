import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [listVideoBase64, setListVideoBase64] = useState([]);
  const [indexVideo, setIndexVideo] = useState(0);

  const arrayLinkVideoDemo = [
    "https://bm-translations.de/bilder/krystian-manthey-referenzen.mp4",
    "https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/homepage/dota_montage_02.mp4",
  ];

  async function convertFileToBase64(file) {
    // check isBlob
    const isBlob = !(file instanceof Blob);
    if (isBlob) {
      file = await fetch(file).then((result) => result.blob());
    }
    // convert : Blob >> Base64
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener("load", () => {
      setListVideoBase64((oldArray) => [...oldArray, reader.result]);
      console.log(listVideoBase64);
    });
  }

  function handleEndVideo() {
    // set indexVideo
    if (indexVideo === listVideoBase64.length - 1) {
      setIndexVideo(0);
    } else {
      setIndexVideo(indexVideo + 1);
    }
  }

  useEffect(() => {
    if (listVideoBase64.length === 0) {
      arrayLinkVideoDemo.map((prop) => convertFileToBase64(prop));
    }
  }, []);

  return (
    <div className="box">
      {listVideoBase64 && (
        <video
          id="display-video-1"
          className="farm"
          width={500}
          height={350}
          autoPlay
          muted
          src={listVideoBase64[indexVideo]}
          onEnded={handleEndVideo}
        ></video>
      )}
    </div>
  );
}

export default App;
