import { useEffect } from "react";

function BackgroundMusic() {
  useEffect(() => {
    const audio = new Audio("/");
    audio.loop = true;
    audio.play();

    return () => {
      audio.pause();
    };
  }, []);

  return null;
}

export default BackgroundMusic;
