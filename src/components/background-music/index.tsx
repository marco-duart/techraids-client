import { useEffect } from "react";
import { SONGS } from "../../utils/constants";

function BackgroundMusic() {
  useEffect(() => {
    const audio = new Audio(SONGS.mainThemeSong);
    audio.loop = true;
    audio.play();

    return () => {
      audio.pause();
    };
  }, []);

  return null;
}

export default BackgroundMusic;
