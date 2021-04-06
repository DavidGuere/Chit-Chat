import React, { useState } from "react";
import "./View.css";

interface IViewProps {
  generatePinFunc: () => void;
  usernameRef: any;
  roomIDRef: any;
}

const View: React.FC<IViewProps> = (prop) => {
  const { generatePinFunc, usernameRef, roomIDRef } = prop;

  return (
    <>
      <div className="pinGeneratorContainer">
        <div className="logo"></div>
        <div className="title">Chit - Chat</div>
        <div className="explanation">
          Enter a nickname and press "Create room" to create a new chatroom or
          press "Join room" to join a room.
          {/* {usernameRef.current.value} */}
        </div>
        <form>
          <div className="inputFields">
            <div className="username">
              <svg className="svg-icon" viewBox="0 0 20 20">
                <path
                  fill="#fff"
                  fillOpacity="0.4"
                  d="M12.443,9.672c0.203-0.496,0.329-1.052,0.329-1.652c0-1.969-1.241-3.565-2.772-3.565S7.228,6.051,7.228,8.02c0,0.599,0.126,1.156,0.33,1.652c-1.379,0.555-2.31,1.553-2.31,2.704c0,1.75,2.128,3.169,4.753,3.169c2.624,0,4.753-1.419,4.753-3.169C14.753,11.225,13.821,10.227,12.443,9.672z M10,5.247c1.094,0,1.98,1.242,1.98,2.773c0,1.531-0.887,2.772-1.98,2.772S8.02,9.551,8.02,8.02C8.02,6.489,8.906,5.247,10,5.247z M10,14.753c-2.187,0-3.96-1.063-3.96-2.377c0-0.854,0.757-1.596,1.885-2.015c0.508,0.745,1.245,1.224,2.076,1.224s1.567-0.479,2.076-1.224c1.127,0.418,1.885,1.162,1.885,2.015C13.961,13.689,12.188,14.753,10,14.753z M10,0.891c-5.031,0-9.109,4.079-9.109,9.109c0,5.031,4.079,9.109,9.109,9.109c5.031,0,9.109-4.078,9.109-9.109C19.109,4.969,15.031,0.891,10,0.891z M10,18.317c-4.593,0-8.317-3.725-8.317-8.317c0-4.593,3.724-8.317,8.317-8.317c4.593,0,8.317,3.724,8.317,8.317C18.317,14.593,14.593,18.317,10,18.317z"
                ></path>
              </svg>
              <input
                required
                type="username"
                className="userInput"
                placeholder="Nickname"
                ref={usernameRef}
              />
            </div>
          </div>
          <button
            type="submit"
            className="button"
            onClick={() => generatePinFunc()}
          >
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
        </form>
      </div>
    </>
  );
};

export default View;
