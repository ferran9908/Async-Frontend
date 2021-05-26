import { useState } from "react";
import { io } from "socket.io-client";
import Join from "./containers/Join/Join";
import Player from "./containers/Player/Player";

const BASE_URL = process.env.REACT_APP_BASE_URL as string;
export const socket = io(BASE_URL);

function App() {
  const [joined, setJoined] = useState(false);
  const [file, setFile] = useState("");
  const [userName, setUserName] = useState("");
  const [room, setRoom] = useState("");
  return (
    <div>
      {!joined ? (
        <Join
          joined={joined}
          file={file}
          setJoined={setJoined}
          setFile={setFile}
          userName={userName}
          room={room}
          setUserName={setUserName}
          setRoom={setRoom}
        />
      ) : (
        <Player file={file} userName={userName} room={room} />
      )}
    </div>
  );
}

export default App;
