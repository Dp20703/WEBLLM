import React, { useState } from "react";
import "./index.css";
import "./app.scss";

const App = () => {
  const [messages, setMessages] = useState([
    {
      role: "system",
      content: "How can i help you?",
    },
    {
      role: "user",
      content: "Hello",
    },
    {
      role: "assistant",
      content: "Hello",
    },
    {
      role: "model",
      content: "How can i help you?",
    },
  ]);
  return (
    <main>
      <section>
        <div className="logo chatgpt-style">WebLLM</div>
        <div className="conversation-area">
          <div className="messages">
            {messages.map((msg, idx) => {
              return (
                <div key={idx} className={`message ${msg.role}`}>
                  {msg.content}
                </div>
              );
            })}
          </div>
          <div className="input-area">
            <input type="text" placeholder="Message LLm " />
            <button>Send</button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default App;
