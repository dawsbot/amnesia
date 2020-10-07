import styled from "styled-components";
import { useInterval } from "react-use";
import createPersistedState from "use-persisted-state";
const useAmnesiaNote = createPersistedState("amnesiaNote");
const useAmnesiaTime = createPersistedState("amnesiaTime");
import { useState } from "react";
import dayjs from "dayjs";

const Button = styled.button`
  padding: 10px 20px;
  border-radius: 8px;
  border: 1px solid black;
  margin: 10px;
`;
const NoteInput = styled.textarea`
  width: 90%;
  height: 300px;
  padding: 50px;
  border-radius: 10px;
`;

export default function Note() {
  const [note, setNote] = useAmnesiaNote("");
  const [time, setTime] = useState(dayjs().toString());
  // next midnight
  // const [amnesiaTime, setAmnesiaTime] = useLocalStorage(
  //   "amnesiaTime",
  //   new Date(date.setHours(24, 0, 0, 0)) as Date
  // );
  const [amnesiaTime, setAmnesiaTime] = useAmnesiaTime(
    dayjs().toString()
    // new Date(date.setHours(24, 0, 0, 0)) as Date
  );

  useInterval(() => {
    setTime(dayjs().toString());

    // amnesia time
    // not available on first mount
    if (amnesiaTime && dayjs(amnesiaTime).isBefore(dayjs())) {
      setNote("");
      setAmnesiaTime(dayjs().add(24, "hour").toString());
      // setAmnesiaTime(dayjs().add(20, "second").toString());
      // ;new Date(new Date().setHours(24, 0, 0, 0)));
    }
  }, 1000);

  return (
    <>
      <h1>Amnesia Notes</h1>
      <Button onClick={() => setNote("")}>Remove forever</Button>
      <br />
      <b>
        <code>current time: {time}</code>
      </b>
      <br />
      <b>
        <code>Amnesia time: {amnesiaTime}</code>
      </b>
      <code>
        <NoteInput
          value={note}
          onChange={(e) => {
            setNote(e.target.value);
          }}
        />
      </code>
    </>
  );
}
