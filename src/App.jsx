import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes';
import { ChatProvider } from './context/ChatContext';
import Navbar from './components/Navbar';
import './styles/index.css';

function App() {
  return (
    <ChatProvider>
      <Router>
        <div className="app-container">
          <Navbar />
          <main className="main-content">
            <Routes />
          </main>
        </div>
      </Router>
    </ChatProvider>
  );
}

export default App;