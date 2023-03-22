import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import React, { Suspense, Fragment, useRef, useState, useEffect } from "react";
import axios from "axios";
import { Images } from "../components/images";

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
        <section className="questions">
          <div className="questions-working">
            <div className="questions-header">
              <h1>Any questions?</h1>
              <p className="mt-3">Chat with our Award Winning Medi Advisor</p>
            </div>
            <div className="row align-items-center mt-5">
              <div className="col-lg-6 col-md-6 col-sm-12 text-start">
                <div className="left-voice-img voice-img">
                  <Image src={Images.voice} className="voice" alt="" />
                  {/* <Image src={Images.zendesk} alt="" /> */}
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12 text-start">
                <div className="left-voice-img">
                  <div className="chat-box-border">
                    <form onSubmit={handleSubmit}>
                      <div className="chatbox-main">
                        <ul>
                          <li>
                            <div
                              className="d-flex align-items-end"
                              style={{ columnGap: "1.5rem" }}
                            >
                              <Image
                                src={Images.chatUser}
                                width={64}
                                height={64}
                                style={{ position: "relative", zIndex: "99" }}
                                alt="user"
                              />
                              <span>
                                Hi! How can we help you?
                              </span>
                            </div>
                          </li>
                          {chatLog.map((message, index) => (
                            <li key={index}>
                              <div
                                className="d-flex align-items-end"
                                style={{ columnGap: "1.5rem" }}
                              >
                                <Image
                                  src={
                                    message.type === "user"
                                      ? Images.chatBot
                                      : Images.chatUser
                                  }
                                  alt={message.type === "user" ? "user" : "bot"}
                                  width={64}
                                  height={64}
                                  style={{ position: "relative", zIndex: "99" }}
                                />
                                <div
                                  key={index}
                                  className={`tw-flex ${
                                    message.type === "user"
                                      ? "tw-justify-end"
                                      : "tw-justify-start"
                                  }`}
                                >
                                  <div
                                    className={`${
                                      message.type === "user"
                                        ? "tw-bg-[#A276FF]"
                                        : "tw-bg-[#6943AF1A]"
                                    } tw-rounded-lg tw-p-4 tw-text-white tw-max-w-sm`}
                                  >
                                    {message.message}
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                        <div className="typing-box d-flex align-items-center gap-3">
                          <Image src={Images.typeIcon} alt="" />
                          <input
                            type="text"
                            placeholder="Start typing.."
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
