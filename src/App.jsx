import React, { useEffect, useState } from "react";
import * as webllm from "@mlc-ai/web-llm";
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
  const [loading, setLoading] = useState(false);
  const [engine, setEngine] = useState(null);
  useEffect(() => {
    const selectedModel = "Llama-2-7b-chat-hf-q4f32_1-MLC";
    webllm
      .CreateMLCEngine(selectedModel, {
        initProgressCallback: (progress) => {
          console.log("initProgressCallback", progress);
        },
      })
      .then((engine) => {
        setEngine(engine);
      })
      .catch((err) => {
        console.log("Failed to create engine", err);
      });
  }, []);

  return (
    <main>
      <section>
        <div className="conversation-area">
        <div className="logo">WebLLM</div>
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
