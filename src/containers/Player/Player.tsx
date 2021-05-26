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
  const player = useRef<any>();
  useEffect(() => {
    socket.on("_PAUSE", () => {
      setPlaying(false);
    });

    socket.on("_PLAY", () => {
      setPlaying(true);
    });

    socket.on("_SEEK_TO", ({ jumpTo: timestamp }) => {
      player.current.seekTo(timestamp);
    });
  }, []);

  return (
    <div className="bg-neptune h-screen grid place-items-center">
      <ReactPlayer
        ref={player}
        playing={playing}
        url={file}
        controls
        onPause={() => {
          socket.emit("PAUSE", { user: userName });
        }}
        onPlay={() => {
          socket.emit("PLAY", { user: userName });
        }}
        onProgress={(progress) => {
          setJumpTo(progress.playedSeconds);
        }}
      />
      <button
        onClick={() => {
          socket.emit("SEEK_TO", { jumpTo, user: userName });
        }}
      >
        Jump
      </button>
    </div>
  );
};

export default Player;
