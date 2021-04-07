import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Background from "./components/view/background/Background";
import Controller from "./components/Controller/Controller";
import "./App.css";

function App() {
  return (
    <>
      <div id="background">
        <Background />
      </div>
      <div id="content">
        <Router>
          <Controller />
        </Router>
      </div>
    </>
  );
}

export default App;
