import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';

const ChatInterface = () => {
  const [messages, setMessages] = useState([
    { 
      text: "Hello! I'm your trip planning assistant. I can help you plan routes from Pune to destinations like Lonavala and Lavasa. Where would you like to go?", 
      sender: "assistant" 
    }
  ]);
  
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };
  
  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages(prevMessages => [
        ...prevMessages,
        { text: input.trim(), sender: "user" },
        { text: "Got it! Let's continue planning your trip.", sender: "assistant" }
      ]);
      setInput("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <section className="h-screen bg-white p-4 flex flex-col">
      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-xl font-semibold">Trip Planning Assistant</h2>
        <p className="text-sm text-gray-600">Plan your perfect journey from Pune</p>
      </div>

      <div className="flex-1 overflow-y-auto py-3 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex items-start gap-4 ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                message.sender === "user" ? "bg-blue-500" : "bg-gray-200"
              }`}
            >
              {message.sender === "user" ? (
                <span className="text-white text-sm">U</span>
              ) : (
                <span className="text-gray-600 text-sm">A</span>
              )}
            </div>
            <div 
              className={`rounded-lg p-4 max-w-[80%] ${
                message.sender === "user" 
                  ? "bg-blue-500 text-white" 
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              <p className="whitespace-pre-wrap">{message.text}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-gray-200 pt-4 mt-auto">
        <div className="flex gap-4">
          <div className="relative flex-1">
            <textarea
              className="w-full border border-gray-300 rounded-lg pl-4 pr-12 py-3 focus:outline-none focus:border-blue-500 resize-none min-h-[44px] max-h-[120px]"
              rows="1"
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Type your message here..."
            />
            <button
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              onClick={handleSendMessage}
              disabled={!input.trim()}
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatInterface;