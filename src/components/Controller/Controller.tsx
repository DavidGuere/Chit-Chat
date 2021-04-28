import React, { useState, useRef } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import axios from "axios";

import CreateRoom from "../view/CreateRoom";
import Chat from "../view/Chat";
import SignUp from "../view/SignUp";
import Login from "../view/Login";

import generatePinAsString from "../util/GeneratePinAsString";
import saveToLocalStorage from "../util/SaveToLocalStorage";
import getUserIDFromLocalStorage from "../util/GetUserIDFromLocalStorage";
import getRoomIDFromLocalStorage from "../util/GetRoomIDFromLocalStorage";
import * as Constants from "../util/Constants";

// export default function Controller() {
const Controller: React.FC = () => {
  const [newRoomId, setNewRoomId] = useState<string>("");
  const [newUserId, setNewUserId] = useState<string>("");
  const usernameRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const passAgainRef = useRef<HTMLInputElement>(null);
  const roomIDRef = useRef<HTMLInputElement>(null);
  const history = useHistory();
  var nickname: string = "";

  ///////////////////////////////////////////// Signing in ////////////////////////////////

  async function signUp() {
    if (
      usernameRef.current &&
      usernameRef &&
      passRef.current &&
      passRef &&
      passAgainRef.current &&
      passAgainRef
    ) {
      if (
        usernameRef.current.value !== "" &&
        passRef.current.value !== "" &&
        passRef.current.value === passAgainRef.current.value
      ) {
        // axios.defaults.headers.post["Content-Type"] =
        //   "application/json;charset=utf-8";
        // axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

        let userJSON = `{\"userId\":1,\"nickname\":\"${usernameRef.current.value}\",\"password\":\"${passRef.current.value}\",\"connected\":\"true\", \"chatRooms\":\"null\"}`;
        const createQuery = Constants.saveToFirestoreQuery(userJSON);
        const createQuery2 = Constants.loginUserQuery(7);
        const createUserResult = await axios.post(Constants.GRAPHQL_API, {
          query: createQuery2,
        });
        const fetchResult = createUserResult.data.data;
        console.log(fetchResult);

        // fetch(Constants.GRAPHQL_API, {
        //   method: "POST",
        //   headers: { "Content-type": "application/json" },
        //   body: JSON.stringify({
        //     query: `query loginUser(userId: 7)`,
        //   }),
        // });
      } else if (passRef.current.value !== passAgainRef.current.value) {
        alert("The password does not match");
      } else if (usernameRef.current.value === "") {
        alert("Enter a nickname");
      } else {
        alert("Enter a password");
      }
    }
  }

  ///////////////////////////////////////////// Log in ////////////////////////////////
  function logIn(): void {
    history.push("/Chit-Chat/createRoom");
  }
  ///////////////////////////////////////////// Create room ////////////////////////////////

  const pinGenerator = generatePinAsString;

  function generatePin() {
    if (usernameRef.current && usernameRef && roomIDRef.current && roomIDRef) {
      // create new room
      if (usernameRef.current.value !== "" && roomIDRef.current.value === "") {
        let roomId: string = pinGenerator(8);
        let userId: string = pinGenerator(6);

        setNewRoomId(roomId);
        setNewUserId(userId);

        saveToLocalStorage(roomId, userId, nickname);

        history.push("/Chit-Chat/chat");
      }
      // Join as new member in chat
      else if (
        usernameRef.current.value !== "" &&
        roomIDRef.current.value !== ""
      ) {
        let userId: string = pinGenerator(6);

        setNewRoomId(roomIDRef.current.value);
        setNewUserId(userId);

        saveToLocalStorage(newRoomId, newUserId, nickname);
      }
      // join to an existent conversation
      else if (
        usernameRef.current.value === "" &&
        roomIDRef.current.value !== ""
      ) {
        let userId = getUserIDFromLocalStorage(roomIDRef.current.value);

        if (userId !== null) {
          setNewRoomId(roomIDRef.current.value);
          setNewUserId(userId);
        } else {
          alert("The room was not found, check the room ID :)");
        }
      } else {
        alert(
          "Enter only a nickname to create a new conversation. Enter a nickname and a room ID to join a conversation or enter just a room ID to rejoin a conversation"
        );
      }
    }
  }

  if (usernameRef.current && usernameRef) {
    nickname = usernameRef.current.value;
  }

  ///////////////////////////////////////////// Connection with server ////////////////////////////////

  var socket = new WebSocket("ws://localhost:9000");

  async function sendMessage() {
    console.log("trying to connect");

    let payload = {
      roomId: getRoomIDFromLocalStorage(newRoomId),
      messageId: "1",
      user: nickname,
      userId: "123456",
      message: "Hello world",
    };
    // socket.onopen = () =>
    socket.send(JSON.stringify(payload));

    socket.onmessage = (message: any) => console.log(message);
  }

  return (
    <>
      <Switch>
        <Route exact path="/Chit-Chat/">
          <Login
            logInFunc={logIn}
            usernameRef={usernameRef}
            passRef={passRef}
          />
        </Route>
        <Route path="/Chit-Chat/signup">
          <SignUp
            signUpFunc={signUp}
            usernameRef={usernameRef}
            passRef={passRef}
            passAgainRef={passAgainRef}
          />
        </Route>
        <Route path="/Chit-Chat/createRoom">
          <CreateRoom
            generatePinFunc={generatePin}
            usernameRef={usernameRef}
            roomIDRef={roomIDRef}
          />
        </Route>
        <Route path="/Chit-Chat/chat">
          <Chat
            username={nickname}
            newPin={newRoomId}
            sendMessage={sendMessage}
          />
        </Route>
      </Switch>
    </>
  );
};

export default Controller;
