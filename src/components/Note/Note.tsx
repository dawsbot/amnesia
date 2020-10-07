import styled from "styled-components";
import { useInterval } from "react-use";
import createPersistedState from "use-persisted-state";
const useAmnesiaNote = createPersistedState("amnesiaNote");
const useAmnesiaTime = createPersistedState("amnesiaTime");
import { useState } from "react";
import dayjs from "dayjs";
import Head from "next/head";

const Button = styled.button`
  padding: 10px 20px;
  border-radius: 6px;
  border: 1px solid black;
  margin: 10px;
  cursor: pointer;
  font-weight: bold;
  :hover {
    color: darkred;
    border-color: red;
  }
`;
const NoteInput = styled.textarea<{ endingSoon?: boolean }>`
  width: 90%;
  height: 100%;
  padding: 50px;
  border-radius: 10px;
  margin: 20px;
  box-sizing: border-box;
  ${(props) => props.endingSoon && `border: 3px solid red; color: darkred;`}
`;

export default function Note() {
  const [note, setNote] = useAmnesiaNote("");
  const [time, setTime] = useState(dayjs().toString());
  const [amnesiaTime, setAmnesiaTime] = useAmnesiaTime(
    dayjs().endOf("day").toString()
  );

  useInterval(() => {
    setTime(dayjs().toString());
    // amnesia time
    // not available on first mount
    if (amnesiaTime && dayjs(amnesiaTime).isBefore(dayjs())) {
      setNote("");
      setAmnesiaTime(dayjs().endOf("day").toString());
    }
  }, 1000);

  const resetAmnesiaTimer = () => {
    setNote("");
  };

  return (
    <>
      <Head>
        <link
          rel="icon"
          type="image/png"
          href="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/237/shocked-face-with-exploding-head_1f92f.png"
        />
      </Head>
      <h1>Amnesia Notes</h1>
      <Button onClick={resetAmnesiaTimer}>Remove forever</Button>
      <br />
      <b>
        <code>time: {dayjs(time).format("dddd hh:mm:ss")}</code>
      </b>
      <br />
      <b>
        <code>Amnesia time: {dayjs(amnesiaTime).format("dddd hh:mm:ss")}</code>
        <br />
        <code>
          Deleting everything in{" "}
          {dayjs(amnesiaTime).diff(dayjs(time), "second").toLocaleString()}{" "}
          seconds
        </code>
      </b>
      <code>
        <NoteInput
          value={note}
          placeholder="type here. It will only last till midnight."
          // with 10 minutes left, make the text box have a red border
          endingSoon={dayjs(amnesiaTime).diff(dayjs(time), "second") < 600}
          onChange={(e) => {
            setNote(e.target.value);
          }}
        />
      </code>
    </>
  );
}
