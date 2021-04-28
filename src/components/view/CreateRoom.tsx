import React from "react";
import "./CreateRoom.css";

interface IViewProps {
  generatePinFunc: () => void;
  logOutFunc: () => void;
  usernameRef: any;
  roomIDRef: any;
}

const CreateRoom: React.FC<IViewProps> = (prop) => {
  const { generatePinFunc, logOutFunc, usernameRef, roomIDRef } = prop;

  return (
    <>
      <div className="pinGeneratorContainer">
        <div className="logo"></div>
        <div className="title">Chit - Chat</div>
        <div className="explanation">
          Press "Create room" to create a new chatroom or enter a room Id press
          "Join room" to join a room.
        </div>
        <button className="button" onClick={() => generatePinFunc()}>
          Create room
        </button>
        <div className="inputFields">
          <div className="username">
            <svg className="svg-icon" viewBox="0 0 20 20">
              <path
                fill="#fff"
                fillOpacity="0.4"
                d="M17.659,3.681H8.468c-0.211,0-0.383,0.172-0.383,0.383v2.681H2.341c-0.21,0-0.383,0.172-0.383,0.383v6.126c0,0.211,0.172,0.383,0.383,0.383h1.532v2.298c0,0.566,0.554,0.368,0.653,0.27l2.569-2.567h4.437c0.21,0,0.383-0.172,0.383-0.383v-2.681h1.013l2.546,2.567c0.242,0.249,0.652,0.065,0.652-0.27v-2.298h1.533c0.211,0,0.383-0.172,0.383-0.382V4.063C18.042,3.853,17.87,3.681,17.659,3.681 M11.148,12.87H6.937c-0.102,0-0.199,0.04-0.27,0.113l-2.028,2.025v-1.756c0-0.211-0.172-0.383-0.383-0.383H2.724V7.51h5.361v2.68c0,0.21,0.172,0.382,0.383,0.382h2.68V12.87z M17.276,9.807h-1.533c-0.211,0-0.383,0.172-0.383,0.383v1.755L13.356,9.92c-0.07-0.073-0.169-0.113-0.27-0.113H8.851v-5.36h8.425V9.807z"
              ></path>
            </svg>
            <input
              type="username"
              className="userInput"
              placeholder="Room ID"
              ref={roomIDRef}
            />
          </div>
        </div>
        <button className="button">Join room</button>
        <button className="button" onClick={() => logOutFunc()}>
          Log out
        </button>
      </div>
    </>
  );
};

export default CreateRoom;
