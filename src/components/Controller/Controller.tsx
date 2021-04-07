import React, { useState, useRef } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import View from "../view/View";
import Chat from "../view/Chat";
import generatePinAsString from "../util/GeneratePinAsString";

export default function Controller() {
  const [newPin, setNewPin] = useState<string>("");
  const usernameRef = useRef<HTMLInputElement>(null);
  const roomIDRef = useRef<HTMLInputElement>(null);
  const history = useHistory();
  var nickname: string = "";

  const pinGenerator = generatePinAsString;

  function generatePin() {
    if (usernameRef.current && usernameRef) {
      if (usernameRef.current.value !== "") {
        let pin: string = pinGenerator();

        setNewPin(pin);

        history.push("/chat");
      } else {
        alert("Enter a nickname :)");
      }
    }
  }

  if (usernameRef.current && usernameRef) {
    nickname = usernameRef.current.value;
  }

  return (
    <>
      <Switch>
        <Route exact path="/">
          <View
            generatePinFunc={generatePin}
            usernameRef={usernameRef}
            roomIDRef={roomIDRef}
          />
        </Route>
        <Route path="/chat">
          <Chat username={nickname} newPin={newPin} />
        </Route>
      </Switch>
    </>
  );
}
