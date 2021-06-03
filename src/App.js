import React from "react";

import ContactForm from "./components/ContactForm";

export default function App() {
  return (
    <div>
      <nav id="top-nav" className="navbar navbar-dark bg-dark">
        <a className="navbar-brand" href="#top-nav"><img width="40px" src="./Lambda-Logo-Red.png" alt="Lamda Schools Logo"/> Lambda Integration Testing Challenge</a>
      </nav>
      <div className="App">
        <ContactForm />
      </div>
    </div>
  );
}
