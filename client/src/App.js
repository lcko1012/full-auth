import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import Body from './components/body/Body'
import Header from './components/header/Header'

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Body />
      </div>
    </Router>

  );
}

export default App;
