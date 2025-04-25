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
  ]);
  const [loading, setLoading] = useState(false);
  const [engine, setEngine] = useState(null);
  const [input, setInput] = useState("");
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
        console.log("Failed to create engine: ", err);
      });
  }, []);

  function sendMessageToLLM() {
    setLoading(true);
    if (input === "") return setLoading(false);
    const tempMessage = [...messages];
    // console.log("temp messagges:", tempMessage);
    tempMessage.push({
      role: "user",
      content: input,
    });
    setMessages(tempMessage);
    // setMessages([...messages], {
    //   role: "user",
    //   content: input,
    // });
    setInput("");
    setLoading(false);

    // Reply from LLM:
    engine.chat.completions
      .create({
        messages: tempMessage,
      })
      .then((reply) => {
        console.log(reply);
        console.log("reply", reply.choices[0].message);
        // console.log(reply.usage);
        const text = reply.choices[0].message.content;
        setMessages([...tempMessage], {
          role: "system",
          content: text,
        });
      });
  }
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
            <input
              type="text"
              value={input}
              placeholder="Message LLm "
              onChange={(e) => {
                setInput(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessageToLLM();
                }
              }}
            />
            <button onClick={() => sendMessageToLLM()}>
              {loading ? <div>Loading....</div> : <div>Send</div>}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default App;
