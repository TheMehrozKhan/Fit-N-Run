import React, { useState } from 'react';
import axios from 'axios';

const ChatComponent = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSendMessage = async () => {
    try {
      const response = await axios.post(
        'http://localhost:3000/api/chatgpt', // Your server's endpoint
        {
          messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: input },
          ],
        }
      );

      setMessages([...messages, { role: 'assistant', content: response.data.choices[0].message.content }]);
      setInput('');
    } catch (error) {
      console.error('Error:', error);
      // Consider displaying a user-friendly error message here
    }
  };

  return (
    <div>
      <div>
        {messages.map((message, index) => (
          <div key={index} className={message.role}>
            {message.content}
          </div>
        ))}
      </div>
      <div>
        <input type="text" value={input} onChange={handleInputChange} />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatComponent;
