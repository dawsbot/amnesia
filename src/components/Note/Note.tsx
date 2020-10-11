import styled from "styled-components";
import { useInterval } from "react-use";
import createPersistedState from "use-persisted-state";
const useAmnesiaNote = createPersistedState("amnesiaNote");
const useAmnesiaTime = createPersistedState("amnesiaTime");
import { useState } from "react";
import dayjs from "dayjs";

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  padding: 10px 18px;
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
  height: 100%;
  padding: 15vh 10vw;
  box-sizing: border-box;
  font-size: 16px;
  border: 0px;
  border-radius: 0px;
  border-bottom: 1px solid grey;
`;

const Footer = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: row-reverse;
  > * {
    margin-left: 20px;
  }
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
    <Container>
      <NoteInput
        value={note}
        placeholder="type here. It will only last till midnight."
        // with 10 minutes left, make the text box have a red border
        endingSoon={dayjs(amnesiaTime).diff(dayjs(time), "second") < 600}
        onChange={(e) => {
          setNote(e.target.value);
        }}
      />
      <Footer>
        <Button onClick={resetAmnesiaTimer}>Delete note now {"-->"}</Button>
        <b>
          <br />
          Deleting everything at midnight (in{" "}
          {dayjs(amnesiaTime).diff(dayjs(time), "second").toLocaleString()}{" "}
          seconds)
        </b>
      </Footer>
    </Container>
  );
}
