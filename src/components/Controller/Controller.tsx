import React, { useState, useRef } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import axios from "axios";

import CreateRoom from "../view/CreateRoom";
import Chat from "../view/Chat";
import SignUp from "../view/SignUp";
import Login from "../view/Login";
import ProtectedRoute from "../util/ProtectedRoute";

import generatePinAsString from "../util/GeneratePinAsString";
import saveToLocalStorage from "../util/SaveToLocalStorage";
import getUserIDFromLocalStorage from "../util/GetUserIDFromLocalStorage";
import getRoomIDFromLocalStorage from "../util/GetRoomIDFromLocalStorage";
import * as GraphQLQueries from "../util/Constants";
import Auth from "../util/Auth";

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
        const saveUserQuery = GraphQLQueries.saveToFirestoreQuery(
          usernameRef.current.value,
          passRef.current.value
        );

        const saveUserResult = await axios.post(GraphQLQueries.GRAPHQL_API, {
          query: saveUserQuery,
        });
        const newUserId = saveUserResult.data.data.saveToFirestore;

        if (newUserId !== 0) {
          sessionStorage.setItem("localUserId", newUserId);
          history.push("/Chit-Chat/createRoom");
        } else {
          alert("The nickname is already in use :(");
        }
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
  async function logIn() {
    if (usernameRef.current && usernameRef && passRef.current && passRef) {
      const loggedQuery = GraphQLQueries.loginUserQuery(
        usernameRef.current.value,
        passRef.current.value
      );
      const loggedResult = await axios.post(GraphQLQueries.GRAPHQL_API, {
        query: loggedQuery,
      });
      const isUserLogged = loggedResult.data.data.loginUser;
      if (isUserLogged) {
        const loggedUserResult = await axios.post(GraphQLQueries.GRAPHQL_API, {
          query: `query {getUserByName(userNick: "${usernameRef.current.value}"){
              userId
          }}`,
        });
        const loggedUserId = loggedUserResult.data.data.getUserByName.userId;
        sessionStorage.setItem("localUserId", loggedUserId);
        history.push("/Chit-Chat/createRoom");
      } else {
        alert("The nickname or the password is incorrect");
      }
    }
  }

  ///////////////////////////////////////////// Log in ////////////////////////////////
  async function logOut() {
    const userIdStr: string | null = sessionStorage.getItem("localUserId");
    const userId: number | null =
      userIdStr !== null ? parseInt(userIdStr) : null;

    if (userId !== null) {
      Auth.logout(userId).then(() => {
        sessionStorage.setItem("localUserId", "");
        history.push("/Chit-Chat/");
      });
    }
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
        <ProtectedRoute path="/Chit-Chat/createRoom">
          <CreateRoom
            generatePinFunc={generatePin}
            logOutFunc={logOut}
            usernameRef={usernameRef}
            roomIDRef={roomIDRef}
          />
        </ProtectedRoute>
        <ProtectedRoute path="/Chit-Chat/chat">
          <Chat
            username={nickname}
            newPin={newRoomId}
            sendMessage={sendMessage}
          />
        </ProtectedRoute>
      </Switch>
    </>
  );
};

export default Controller;
