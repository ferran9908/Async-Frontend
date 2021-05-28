import { FC, useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { socket } from "../../App";
interface Props {
  file: string;
  userName: string;
  room: string;
}
const Player: FC<Props> = ({ file, userName, room }) => {
  const [playing, setPlaying] = useState(false);
  const [jumpTo, setJumpTo] = useState<number>();
  const [shouldSeek, setShouldSeek] = useState(true);
  const [shouldPause, setShouldPause] = useState(true);
  const [shouldPlay, setShouldPlay] = useState(true);
  const player = useRef<any>();
  useEffect(() => {
    socket.on("_PAUSE", () => {
      setShouldPause(false);
      setPlaying(false);
    });

    socket.on("_PLAY", () => {
      setShouldPlay(true);
      setPlaying(true);
    });

    socket.on("_SEEK_TO", ({ jumpTo: timestamp }) => {
      player.current.seekTo(timestamp);
    });

    socket.on("_SEEK", ({ seconds }) => {
      setShouldSeek(false);
      player.current.seekTo(seconds);
    });
  }, []);

  return (
    <div className="bg-neptune h-screen grid place-items-center">
      <div>
        <ReactPlayer
          ref={player}
          playing={playing}
          url={file}
          controls
          onPause={() => {
            if (shouldPause) socket.emit("PAUSE", { user: userName });
            else setShouldPause(true);
            console.log("PAUSING HERE");
          }}
          onPlay={() => {
            if (shouldPlay) socket.emit("PLAY", { user: userName });
            else setShouldPlay(true);
            console.log("PLAYING HERE");
          }}
          onProgress={(progress) => {
            setJumpTo(progress.playedSeconds);
          }}
          onSeek={(seconds) => {
            if (shouldSeek) socket.emit("SEEK", { seconds });
            else setShouldSeek(true);
          }}
        />
        <div className="text-center">
          <button
            onClick={() => {
              socket.emit("SEEK_TO", { jumpTo, user: userName });
            }}
            className="bg-blue-gem p-2 text-white rounded-md text-xl"
          >
            Pause and Click Here to sync timings
          </button>
        </div>
      </div>
    </div>
  );
};

export default Player;
