import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import React, { Suspense, Fragment, useRef, useState, useEffect } from "react";
import axios from "axios";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  // chatGPT integration
  const [inputValue, setInputValue] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    setChatLog((prevChatLog) => [
      ...prevChatLog,
      { type: "user", message: inputValue },
    ]);

    sendMessage(inputValue);

    setInputValue("");
  };

  const sendMessage = (message) => {
    const url = "/api/chat";

    const data = {
      model: "gpt-3.5-turbo-0301",
      messages: [{ role: "user", content: message }],
    };

    setIsLoading(true);

    axios
      .post(url, data)
      .then((response) => {
        console.log(response);
        setChatLog((prevChatLog) => [
          ...prevChatLog,
          { type: "bot", message: response.data.choices[0].message.content },
        ]);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  };
  //collapse
  useEffect(() => {
    const coll = document.getElementsByClassName('collapsible');

    for (let i = 0; i < coll.length; i++) {
      coll[i].addEventListener('click', function () {
        this.classList.toggle('active');

        const content = this.nextElementSibling;

        if (content.style.maxHeight) {
          content.style.maxHeight = null;
        } else {
          content.style.maxHeight = content.scrollHeight + 'px';
        }
      });
    }
  }, []);
  return (
    <>
      <Head>
        <title>Chat Bot</title>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
      <div className="chat-bar-collapsible">
        <button id="chat-button" type="button" className="collapsible">Chat with us!
            <i id="chat-icon" style={{color: "#fff"}} className="fa fa-fw fa-comments-o"></i>
        </button>

        <div className="content">
            <div className="full-chat-block">
            
                <div className="outer-container">
                    <div className="chat-container">
                        
                        <div id="chatbox">
                            <h5 id="chat-timestamp"></h5>
                            <p id="botStarterMessage" className="botText"><span>Loading...</span></p>
                        </div>

                        
                        <div className="chat-bar-input-block">
                            <div id="userInput">
                                <input id="textInput" className="input-box" type="text" name="msg"
                                    placeholder="Tap 'Enter' to send a message" />
                                <p></p>
                            </div>

                            <div className="chat-bar-icons">
                                <i id="chat-icon" style={{color: "crimson"}} className="fa fa-fw fa-heart"
                                    onClick="heartButton()"></i>
                                <i id="chat-icon" style={{color: "#333"}} className="fa fa-fw fa-send"
                                    onClick="sendButton()"></i>
                            </div>
                        </div>

                        <div id="chat-bar-bottom">
                            <p></p>
                        </div>

                    </div>
                </div>

            </div>
        </div>

    </div>
      </main>
    </>
  );
}
