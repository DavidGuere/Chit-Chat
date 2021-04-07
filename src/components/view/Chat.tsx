import React from "react";
import "./Chat.css";

interface IChatProps {
  username: string;
  newPin: string;
}

const Chat: React.FC<IChatProps> = (props) => {
  const { username, newPin } = props;
  return (
    <>
      <section className="glass">
        <div className="dashboard">
          <div className="userLogo"></div>
          <h1 className="nickname"> Welcome {username}!</h1>
          <h3 className="roomDescription">Room ID: {newPin}</h3>
          <div className="explanationDashboard">
            Share this number with your friends to invite them to the
            conversation.
          </div>
          <button className="button">Disconnect</button>
        </div>
        <div className="chatSection">
          <div className="messages">
            <div className="message local">
              <h4 className="user local"> local user name</h4>
              <p className="text">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga
                tempora inventore, vero exercitationem corporis adipisci quia
                officia molestias at reiciendis impedit laborum quo commodi quae
                nostrum nam asperiores esse quaerat.
              </p>
            </div>
            <div className="message">
              <h4 className="user"> external user name</h4>
              <p className="text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Accusantium vitae dolorem, odio voluptates quo minus sequi, enim
                explicabo repellendus tempore perferendis et consequuntur
                inventore nemo hic veritatis placeat voluptate distinctio!
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
            <button className="button buttonTextArea">Send</button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Chat;
