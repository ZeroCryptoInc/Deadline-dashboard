import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DeadlineTracker from "./components/DeadlineTracker";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DeadlineTracker />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;