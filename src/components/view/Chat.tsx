import React, { useState } from "react";
import "./Chat.css";

interface IChatProps {
  username: string;
  newPin: string;
}

const Chat: React.FC<IChatProps> = (props) => {
  const { username, newPin } = props;

  const [toggleMenu, setToggleMenu] = useState<boolean>(true);

  const openCloseMobileMenu = (): void => {
    setToggleMenu(!toggleMenu);
    const getDash = document.getElementById("dash");
    const getChat = document.getElementById("chat");

    if (toggleMenu === false) {
      if (getDash === null) {
      } else {
        getDash.style.left = "-110%";
      }

      if (getChat === null) {
      } else {
        getChat.style.right = "0";
      }
    }

    if (toggleMenu === true) {
      if (getDash === null) {
      } else {
        getDash.style.left = "0";
      }

      if (getChat === null) {
      } else {
        getChat.style.right = "-100%";
      }
    }
  };
  return (
    <>
      <section className="glass">
        <div className="mobileMenu" onClick={openCloseMobileMenu}>
          {toggleMenu ? (
            <svg className="svg-icon openMenu" viewBox="0 0 20 20">
              <path
                fill="#fff"
                d="M2.25,12.584c-0.713,0-1.292,0.578-1.292,1.291s0.579,1.291,1.292,1.291c0.713,0,1.292-0.578,1.292-1.291S2.963,12.584,2.25,12.584z M2.25,14.307c-0.238,0-0.43-0.193-0.43-0.432s0.192-0.432,0.43-0.432c0.238,0,0.431,0.193,0.431,0.432S2.488,14.307,2.25,14.307z M5.694,6.555H18.61c0.237,0,0.431-0.191,0.431-0.43s-0.193-0.431-0.431-0.431H5.694c-0.238,0-0.43,0.192-0.43,0.431S5.457,6.555,5.694,6.555z M2.25,8.708c-0.713,0-1.292,0.578-1.292,1.291c0,0.715,0.579,1.292,1.292,1.292c0.713,0,1.292-0.577,1.292-1.292C3.542,9.287,2.963,8.708,2.25,8.708z M2.25,10.43c-0.238,0-0.43-0.192-0.43-0.431c0-0.237,0.192-0.43,0.43-0.43c0.238,0,0.431,0.192,0.431,0.43C2.681,10.238,2.488,10.43,2.25,10.43z M18.61,9.57H5.694c-0.238,0-0.43,0.192-0.43,0.43c0,0.238,0.192,0.431,0.43,0.431H18.61c0.237,0,0.431-0.192,0.431-0.431C19.041,9.762,18.848,9.57,18.61,9.57z M18.61,13.443H5.694c-0.238,0-0.43,0.193-0.43,0.432s0.192,0.432,0.43,0.432H18.61c0.237,0,0.431-0.193,0.431-0.432S18.848,13.443,18.61,13.443z M2.25,4.833c-0.713,0-1.292,0.578-1.292,1.292c0,0.713,0.579,1.291,1.292,1.291c0.713,0,1.292-0.578,1.292-1.291C3.542,5.412,2.963,4.833,2.25,4.833z M2.25,6.555c-0.238,0-0.43-0.191-0.43-0.43s0.192-0.431,0.43-0.431c0.238,0,0.431,0.192,0.431,0.431S2.488,6.555,2.25,6.555z"
              ></path>
            </svg>
          ) : (
            <svg className="svg-icon closeMenu" viewBox="0 0 20 20">
              <path
                fill="#fff"
                d="M12.71,7.291c-0.15-0.15-0.393-0.15-0.542,0L10,9.458L7.833,7.291c-0.15-0.15-0.392-0.15-0.542,0c-0.149,0.149-0.149,0.392,0,0.541L9.458,10l-2.168,2.167c-0.149,0.15-0.149,0.393,0,0.542c0.15,0.149,0.392,0.149,0.542,0L10,10.542l2.168,2.167c0.149,0.149,0.392,0.149,0.542,0c0.148-0.149,0.148-0.392,0-0.542L10.542,10l2.168-2.168C12.858,7.683,12.858,7.44,12.71,7.291z M10,1.188c-4.867,0-8.812,3.946-8.812,8.812c0,4.867,3.945,8.812,8.812,8.812s8.812-3.945,8.812-8.812C18.812,5.133,14.867,1.188,10,1.188z M10,18.046c-4.444,0-8.046-3.603-8.046-8.046c0-4.444,3.603-8.046,8.046-8.046c4.443,0,8.046,3.602,8.046,8.046C18.046,14.443,14.443,18.046,10,18.046z"
              ></path>
            </svg>
          )}
        </div>
        <div id="dash" className="dashboard">
          <div className="userLogo"></div>
          <h1 className="nickname"> Welcome {username}!</h1>
          <h3 className="roomDescription">Room ID: {newPin}</h3>
          <div className="explanationDashboard">
            Share this number with your friends to invite them to the
            conversation.
          </div>
          <button className="button">Disconnect</button>
        </div>
        <div id="chat" className="chatSection">
          <div className="messages">
            <div className="message local">
              <h4 className="user local"> local user name</h4>
              <p className="text">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga
                tempora inventore, vero exercitationem corporis adipisci quia
                officia molestias at reiciendis impedit laborum quo commodi quae
                nostrum nam asperiores esse quaerat.
                sssssssssssssssssssssssssssssssssssaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
              </p>
            </div>
            <div className="message">
              <h4 className="user"> external user name</h4>
              <p className="text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Accusantium vitae dolorem, odio voluptates quo
                miaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaanus sequi, enim
                explicabo repellendus tempore perferendis et consequuntur
                inventore nemo hic veritatis placeat voluptate distinctio! Lorem
                ipsum dolor sit amet consectetur adipisicing elit. Repellendus
                repellat mollitia atque et dolore dicta aut numquam ducimus odit
                quam blanditiis, voluptatibus hic placeat esse amet? Quae sequi
                dolore voluptate.
              </p>
            </div>
          </div>
          <div className="textArea">
            <div className="inputFields inputFieldsTextArea">
              <div className="username usernameTextArea">
                <textarea
                  className="userInput userInputTextArea"
                  placeholder="Write your message here :)"
                />
              </div>
            </div>
            <div className="buttonTextArea">
              <button className="button btn">
                <svg className="svg-icon btn-svg" viewBox="0 0 20 20">
                  <path
                    fill="#fff"
                    d="M17.218,2.268L2.477,8.388C2.13,8.535,2.164,9.05,2.542,9.134L9.33,10.67l1.535,6.787c0.083,0.377,0.602,0.415,0.745,0.065l6.123-14.74C17.866,2.46,17.539,2.134,17.218,2.268 M3.92,8.641l11.772-4.89L9.535,9.909L3.92,8.641z M11.358,16.078l-1.268-5.613l6.157-6.157L11.358,16.078z"
                  ></path>
                </svg>
                <p className="btn-text">Send</p>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Chat;
