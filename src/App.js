import React from "react";
import { Router, Link } from "@reach/router";
import AppScene1 from "./AppScene1";
import AppScene2 from "./AppScene2";
import AppScene3 from "./AppScene3";
import Home from "./Home";

function App() {
  return (
    <>
      <header style={{ position: "fixed", top: 0, left: 0, zIndex: 33 }}>
        <Link to="/">
          <h1>React 3d</h1>
        </Link>
        <nav>
          <Link to="/scene-one">Scene One</Link>
          <Link to="/scene-two">Scene Two</Link>
          <Link to="/scene-three">Scene Three</Link>
        </nav>
      </header>
      <Router>
        <Home path="/" />
        <AppScene1 path="/scene-one" />
        <AppScene2 path="/scene-two" />
        <AppScene3 path="/scene-three" />
      </Router>
    </>
  );
}

export default App;
