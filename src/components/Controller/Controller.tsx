import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import View from "../view/View";
import Chat from "../view/Chat";
import generatePinAsString from "../util/GeneratePinAsString";

export default function Controller() {
  const [newPin, setNewPin] = useState<string>();
  const usernameRef = useRef<HTMLInputElement>(null);
  const roomIDRef = useRef<HTMLInputElement>(null);

  const pinGenerator = generatePinAsString;

  function generatePin() {
    if (usernameRef.current && usernameRef) {
      if (usernameRef.current.value !== "") {
        let pin: string = pinGenerator();

        setNewPin(pin);

        console.log(newPin);
      }
    }
  }

  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <View
              generatePinFunc={generatePin}
              usernameRef={usernameRef}
              roomIDRef={roomIDRef}
            />
          </Route>
          <Route path="/chat" component={Chat} />
        </Switch>
      </Router>
    </>
  );
}
