import React, { useState } from "react";
import SendIcon from '@mui/icons-material/Send';
const ChatInterface = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! I'm your trip planning assistant. I can help you plan routes from Pune to destinations like Lonavala and Lavasa. Where would you like to go?", sender: "assistant" }
  ]);
  
  const [input, setInput] = useState("");
  
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };
  
  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages([
        ...messages,
        { text: input, sender: "user" },
      ]);
      setInput("");
      
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "Got it! Let's continue planning your trip.", sender: "assistant" }
      ]);
    }
  };

  return (
    <section id="chat_interface" className="h-screen bg-white p-4 flex flex-col">
      <div className="border-b border-gray-200 pb-4" id="el-i6hw5dua">
        <h2 className="text-xl font-semibold" id="el-bbwmt4d2">Trip Planning Assistant</h2>
        <p className="text-sm text-gray-600" id="el-0qwnhvut">Plan your perfect journey from Pune</p>
      </div>

      <div className="flex-2 overflow-y-auto py-3 space-y-4" id="chat-messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex items-start gap-4 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            id={`message-${index}`}
          >
            <div
              className={`w-8 h-8 rounded-full ${message.sender === "user" ? "bg-blue-100" : "bg-gray-200"} flex items-center justify-center`}
              id={`avatar-${index}`}
            >
              {message.sender === "user" ? (
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" id="el-5ag42aoq">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                </svg>
              ) : (
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" id="el-5ag42aoq">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                </svg>
              )}
            </div>
            <div className={`bg-${message.sender === "user" ? "blue-100" : "gray-100"} rounded-lg p-4 max-w-[80%]`} id="el-nw2su0rt">
              <p className="text-gray-800" id={`message-text-${index}`}>{message.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 pt-4" id="el-abkn5n4j">
        <div className="flex gap-4" id="el-a1yms3fw">
        <div className="flex-1 relative" id="el-8ends1g6">
  <textarea
    id="chat-input"
    className="w-full border border-gray-300 rounded-lg pl-4 pr-12 py-3 focus:outline-none focus:border-blue-500 resize-none"
    rows="1"
    value={input}
    onChange={handleInputChange}
    onKeyDown={(e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault(); 
        handleSendMessage();
      }
    }}
    placeholder="Type your message here..."
  />
  <button
    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
    onClick={handleSendMessage}
    id="el-84ulbk4t"
  >
    <SendIcon />
  </button>
</div>

        </div>
      </div>
    </section>
  );
};

export default ChatInterface;
