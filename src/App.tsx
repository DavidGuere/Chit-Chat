import React from "react";
import Background from "./components/background/Background";
import Controller from "./components/Controller/Controller";
import "./App.css";

function App() {
  return (
    <>
      <div id="background">
        <Background />
      </div>
      <div id="content">
        <Controller />
      </div>
    </>
  );
}

export default App;
