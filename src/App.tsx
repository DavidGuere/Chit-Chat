import React from "react";
import Background from "./components/background/Background";
import View from "./components/view/View.js";
import "./App.css";

function App() {
  return (
    <>
      <div id="background">
        <Background />
      </div>
      <div id="content">
        <View />
      </div>
    </>
  );
}

export default App;
