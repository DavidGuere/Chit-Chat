import React, { useState, useRef, useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import axios from "axios";

import CreateRoom from "../view/CreateRoom";
import Chat from "../view/Chat";
import SignUp from "../view/SignUp";
import Login from "../view/Login";
import ProtectedRoute from "../util/ProtectedRoute";

import generatePinAsString from "../util/GeneratePinAsString";
import * as GraphQLQueries from "../util/Constants";
import Auth from "../util/Auth";

const Controller: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<string>("");
  const [currentRoom, setCurrentRoom] = useState<string>("");
  const [messagess, setMessagess] = useState<any>([]);
  const [websocket, setWebsocket] = useState<any>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const passAgainRef = useRef<HTMLInputElement>(null);
  const roomIDRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLInputElement>(null);
  const history = useHistory();
  var messages: any = [];

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

  ///////////////////////////////////////////// Log out ////////////////////////////////
  async function logOut() {
    const userIdStr: string | null = sessionStorage.getItem("localUserId");
    const userId: number | null =
      userIdStr !== null ? parseInt(userIdStr) : null;

    if (userId !== null) {
      Auth.logout(userId).then(() => {
        sessionStorage.setItem("localUserId", "");
        sessionStorage.setItem("currentUser", "");
        history.push("/Chit-Chat/");
      });
    }
  }
  ///////////////////////////////////////////// Create room ////////////////////////////////

  async function createRoom() {
    const pinGenerator = generatePinAsString;

    let roomId: string = pinGenerator(8);

    console.log(roomId);

    const roomAvailableQuery = GraphQLQueries.isRoomIDAvailableQuery(roomId);
    const loggedResult = await axios.post(GraphQLQueries.GRAPHQL_API, {
      query: roomAvailableQuery,
    });

    const isRoomAvailable = loggedResult.data.data.isRoomIDAvailable;

    if (isRoomAvailable) {
      const createRoomQuery = GraphQLQueries.createNewRoomQuery(roomId);
      const createRoomResult = await axios.post(GraphQLQueries.GRAPHQL_API, {
        query: createRoomQuery,
      });

      const userIdStr: string | null = sessionStorage.getItem("localUserId");
      const userId: number | null =
        userIdStr !== null ? parseInt(userIdStr) : null;

      if (userId !== null) {
        const saveRoomToUserQuery = GraphQLQueries.saveUserChatRoomToFirestoreQuery(
          userId,
          roomId
        );
        const saveRoomToUserResult = await axios.post(
          GraphQLQueries.GRAPHQL_API,
          {
            query: saveRoomToUserQuery,
          }
        );

        const setUserCurrentRoomQuery = GraphQLQueries.setUserCurrentRoomQuery(
          userId,
          roomId
        );
        const setUserCurrentRoomResult = await axios.post(
          GraphQLQueries.GRAPHQL_API,
          {
            query: setUserCurrentRoomQuery,
          }
        );
        history.push("/Chit-Chat/chat");
      }
    } else {
      createRoom();
    }
  }

  ///////////////////////////////////////////// Get current user data ////////////////////////////////
  async function getCurrentUserData() {
    const userIdStr: string | null = sessionStorage.getItem("localUserId");
    const userId: number | null =
      userIdStr !== null ? parseInt(userIdStr) : null;

    const userDataResult = await axios.post(GraphQLQueries.GRAPHQL_API, {
      query: `query{getUser(userId: ${userId}){
              currentRoom,
              nickname
            }}`,
    });

    setCurrentRoom(userDataResult.data.data.getUser.currentRoom);
    setCurrentUser(userDataResult.data.data.getUser.nickname);
    sessionStorage.setItem("currentRoom", currentRoom);
    sessionStorage.setItem("currentUser", currentUser);
  }

  ///////////////////////////////////////////// Join user to a room ////////////////////////////////
  async function joinRoom() {
    if (roomIDRef.current && roomIDRef) {
      console.log(roomIDRef.current.value.length);
      console.log(roomIDRef.current.value);

      if (
        roomIDRef.current.value !== "" &&
        roomIDRef.current.value.length === 8
      ) {
        const userIdStr: string | null = sessionStorage.getItem("localUserId");
        const userId: number | null =
          userIdStr !== null ? parseInt(userIdStr) : null;

        if (userId !== null) {
          const joinRoomQuery = GraphQLQueries.joinUserToRoomQuery(
            userId,
            roomIDRef.current.value
          );
          const joinRoomResult = await axios.post(GraphQLQueries.GRAPHQL_API, {
            query: joinRoomQuery,
          });

          if (joinRoomResult.data.data.joinUserToRoom) {
            history.push("/Chit-Chat/chat");
          } else {
            alert("The room does not exist");
          }
        }
      } else {
        alert("Enter a valid room Id (Only number and 8 digits)");
      }
    }
  }

  ///////////////////////////////////////////// Leave room ////////////////////////////////
  async function leaveRoom() {
    const userIdStr: string | null = sessionStorage.getItem("localUserId");
    const userId: number | null =
      userIdStr !== null ? parseInt(userIdStr) : null;

    if (userId !== null) {
      const leaveRoomQuery = GraphQLQueries.leaveCurrentRoomQuery(userId);
      const leaveRoomResult = await axios.post(GraphQLQueries.GRAPHQL_API, {
        query: leaveRoomQuery,
      });

      sessionStorage.setItem("currentRoom", "");
      history.push("/Chit-Chat/createRoom");
      websocket.close();
      messages.length = 0;
    }
  }

  ///////////////////////////////////////////// Connection with WebSocket server ////////////////////////////////

  function connectToWebsocket() {
    console.log("oppening connection");

    const socket = new WebSocket("ws://localhost:9000");
    setWebsocket(socket);
  }

  async function sendMessage() {
    if (messageRef && messageRef.current && messageRef.current.value !== "") {
      let payload = {
        roomId: sessionStorage.getItem("currentRoom"),
        messageId: "1",
        user: sessionStorage.getItem("currentUser"),
        message: messageRef.current.value,
        source: "external",
      };
      websocket.send(JSON.stringify(payload));

      messageRef.current.value = "";
    }
  }

  if (websocket !== null) {
    websocket.onmessage = (message: any) => {
      const localRoom: string | null = sessionStorage.getItem("currentRoom");
      const localUser: string | null = sessionStorage.getItem("currentUser");
      var incomingMessage = JSON.parse(message.data);

      if (localRoom !== null && localUser !== null) {
        if (incomingMessage.roomId === localRoom) {
          if (
            incomingMessage.user === localUser ||
            incomingMessage.user === "Chit-Chat"
          ) {
            incomingMessage.source = "local";
          }
          messages = [...messages, incomingMessage];
          setMessagess([...messagess, incomingMessage]);
        }
      }
      console.log(messages);
    };

    websocket.onclose = () => console.log("disconnected");
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
            createRoomFunc={createRoom}
            joinRoomFunc={joinRoom}
            logOutFunc={logOut}
            roomIDRef={roomIDRef}
            connectToWebsocketFunc={connectToWebsocket}
          />
        </ProtectedRoute>
        <ProtectedRoute path="/Chit-Chat/chat">
          <Chat
            username={currentUser}
            roomId={currentRoom}
            sendMessage={sendMessage}
            currentDataFunc={getCurrentUserData}
            leaveRoomFunc={leaveRoom}
            messageRef={messageRef}
            messages={messagess}
          />
        </ProtectedRoute>
      </Switch>
    </>
  );
};

export default Controller;
