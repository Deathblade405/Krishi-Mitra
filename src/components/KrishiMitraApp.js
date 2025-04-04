import React, { useState } from 'react';
import './KrishiMitraApp.css';
import krishiLogo from './krishi.png';
import userAvatar from './user.png';

const dummyChats = [
  { role: 'ai', content: 'Welcome to Krishi Mitra! How can I assist you today?' },
  { role: 'user', content: 'What crops should I plant in summer?' },
  { role: 'ai', content: 'In summer, you can go for maize, cotton, and pulses depending on your region.' }
];

const KrishiMitraApp = () => {
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState(dummyChats);
  const [audioDesc, setAudioDesc] = useState('None');
  const [language, setLanguage] = useState('English');
  const [pastChats, setPastChats] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  const handleSend = () => {
    if (!chatInput.trim()) return;
    const newChat = [...chatHistory, { role: 'user', content: chatInput }];
    setChatHistory(newChat);
    setChatInput('');
    setTimeout(() => {
      setChatHistory(prev => [...prev, { role: 'ai', content: 'Processing your request...' }]);
    }, 500);
  };

  const handleNewChat = () => {
    if (chatHistory.length > 0) {
      setPastChats([...pastChats, chatHistory]);
    }
    setChatHistory([]);
  };

  const handleSelectPastChat = (index) => {
    setChatHistory(pastChats[index]);
    setShowHistory(false);
  };

  return (
    <div className="chat-wrapper">
      {/* Sidebar */}
      <div className="sidebar">
        <img src={krishiLogo} alt="Krishi Mitra" className="sidebar-logo" />

        <div className="sidebar-menu">
          <div className="icon" onClick={handleNewChat} title="New Chat">➕</div>
          <div className="icon" onClick={() => setShowHistory(!showHistory)} title="Chat History">📜</div>
          <div className="icon" title="Profile">👤</div>
          <div className="icon" title="Settings">⚙️</div>
        </div>

        <img src={userAvatar} alt="User" className="user-avatar" />
      </div>

      {/* Main Chat */}
      <div className="chat-main">
        <div className="chat-history">
          {chatHistory.map((chat, idx) => (
            <div key={idx} className={`chat-bubble ${chat.role === 'user' ? 'user' : 'ai'}`}>
              {chat.content}
            </div>
          ))}
        </div>

        {/* Input Section */}
        <div className="chat-input-wrapper">
          <div className="chat-input-area">
            <input
              type="text"
              className="chat-input"
              placeholder="Ask something..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button className="send-button" onClick={handleSend}>➤</button>
          </div>

          {/* Dropdowns */}
          <div className="chat-filters">
            <div className="filter">
              <label>Audio Description</label>
              <select value={audioDesc} onChange={(e) => setAudioDesc(e.target.value)}>
                <option>None</option>
                <option>Bird sounds</option>
                <option>Tractor noise</option>
              </select>
            </div>
            <div className="filter">
              <label>Language</label>
              <select value={language} onChange={(e) => setLanguage(e.target.value)}>
                <option>English</option>
                <option>Hindi</option>
                <option>Telugu</option>
                <option>Tamil</option>
                <option>Kannada</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Floating History Box */}
      {showHistory && (
        <div style={{
          position: 'absolute',
          left: 100,
          top: 100,
          background: 'rgba(15,23,42,0.9)',
          padding: '20px',
          borderRadius: '12px',
          boxShadow: '0 0 10px rgba(0,0,0,0.3)',
          maxHeight: '60vh',
          overflowY: 'auto',
          zIndex: 999
        }}>
          <h3 style={{ margin: 0, marginBottom: 10, fontSize: 16 }}>Chat History</h3>
          {pastChats.map((chat, idx) => {
            const preview = chat.find(c => c.role === 'user')?.content || 'No title';
            return (
              <div key={idx} style={{
                marginTop: 10,
                padding: 10,
                borderRadius: 10,
                background: '#0f172a',
                color: '#e5e7eb',
                fontSize: 13,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 10
              }}>
                <span onClick={() => handleSelectPastChat(idx)} style={{ flex: 1 }}>
                  {preview.length > 40 ? preview.slice(0, 40) + '...' : preview}
                </span>
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    setPastChats(pastChats.filter((_, i) => i !== idx));
                  }}
                  style={{
                    color: '#f87171',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    fontSize: 16
                  }}
                  title="Delete chat"
                >
                  🗑️
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default KrishiMitraApp;
