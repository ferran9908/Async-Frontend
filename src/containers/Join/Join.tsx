import { Button, TextField } from "@material-ui/core";
import { FC, useEffect, useState } from "react";
import Card from "../../components/Card";

import { socket } from "../../App";

interface Props {
  joined?: boolean;
  setJoined: React.Dispatch<React.SetStateAction<boolean>>;
  file: string;
  setFile: React.Dispatch<React.SetStateAction<string>>;
  userName: string;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
  room: string;
  setRoom: React.Dispatch<React.SetStateAction<string>>;
}

const Join: FC<Props> = ({
  setJoined,
  file,
  setFile,
  userName,
  room,
  setUserName,
  setRoom,
}) => {
  const [error, setError] = useState(false);
  useEffect(() => {
    console.log({ file });
  }, [file]);
  return (
    <div className="h-screen w-screen bg-neptune grid place-items-center">
      <Card>
        <TextField
          className="w-4/5 my-2"
          id="outlined-basic"
          label="Username"
          variant="outlined"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <TextField
          className="w-4/5 my-2"
          id="outlined-basic"
          label="Room"
          variant="outlined"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        />
        <input
          type="file"
          onChange={(e) => {
            // @ts-ignore
            setFile(URL.createObjectURL(e.target.files[0]));
          }}
        />
        {error && (
          <p className="text-red-500 text-sm">* Submit all required data</p>
        )}

        <Button
          onClick={() => {
            if (!room && !file && !userName) {
              setError(true);
              return;
            }
            socket.emit("join", { name: userName, room });
            setJoined(true);
          }}
          variant="contained"
          color="primary"
        >
          Join
        </Button>
      </Card>
    </div>
  );
};

export default Join;
