import styled from "styled-components";
import { useInterval } from "react-use";
import createPersistedState from "use-persisted-state";
const useAmnesiaNote = createPersistedState("amnesiaNote");
import { useState } from "react";
import dayjs from "dayjs";
import Head from "next/head";

const Button = styled.button`
  padding: 8px 18px;
  border-radius: 6px;
  border: 1px solid black;
  margin: 10px 10px 10px 0px;
  cursor: pointer;
  font-weight: bold;
  :hover {
    color: darkred;
    border-color: red;
  }
`;
const NoteInput = styled.textarea<{ endingSoon?: boolean }>`
  width: 100%;
  height: 90vh;
  padding: 15vh 10vw;
  box-sizing: border-box;
  font-size: 16px;
`;

const Footer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  > * {
    margin-left: 10px;
  }
`;

export default function Note() {
  const [note, setNote] = useAmnesiaNote("");
  const [time, setTime] = useState(dayjs().toString());
  const [amnesiaTime, setAmnesiaTime] = useState(
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
      <Footer>
        <Button onClick={resetAmnesiaTimer}>Delete note now</Button>
        <b>
          <br />
          <code>
            Deleting everything at midnight (in{" "}
            {dayjs(amnesiaTime).diff(dayjs(time), "second").toLocaleString()}{" "}
            seconds)
          </code>
        </b>
      </Footer>
    </>
  );
}
