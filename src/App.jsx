import { useEffect, useRef, useState } from "react";
import "./App.css";
import { URL } from "./constants";
import Answer from "./components/Answers";

function App() {
  const [question, setQuestion] = useState("");
  const [data, getData] = useState([]);
  const [qSet, recentHistory] = useState(
    JSON.parse(localStorage.getItem("history")),
  );
  const [selectedHistory, setSelectedHistory] = useState("");
  const scrollToAns = useRef();
  const [loader, setLoader] = useState(false);

  const payLoad = {
    contents: [
      {
        parts: [{ text: question }],
      },
    ],
  };

  // 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
  const askQuestion = async () => {
    if (!question && !selectedHistory) {
      return false;
    }

    if (question) {
      if (localStorage.getItem("history")) {
        let history = JSON.parse(localStorage.getItem("history"));

        history = [question, ...history];

        localStorage.setItem("history", JSON.stringify(history));
        recentHistory(history);
      } else {
        localStorage.setItem("history", JSON.stringify([question]));
        recentHistory([question]);
      }
    }

    const payLoadData = question ? question : selectedHistory;

    setLoader(true);
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization:
            "Bearer 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 ",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [{ role: "user", content: payLoadData }],
        }),
      },
    );

    const res = await response.json();

    // console.log(res);

    const answer = res.choices[0].message.content;

    getData((prev) => [
      ...prev,
      { type: "q", text: question ? question : selectedHistory },
      { type: "a", text: [answer] },
    ]);
    setLoader(false);
    setQuestion("");
  };

  const clear = () => {
    localStorage.clear();
    recentHistory([]);
  };

  const isEnter = (event) => {
    if (event.key == "Enter") {
      askQuestion();
    }
  };

  useEffect(() => {
    scrollToAns.current?.scrollTo({
      top: scrollToAns.current.scrollHeight,
      behavior: "smooth",
    });
  }, [data]);

  useEffect(() => {
    if (selectedHistory) {
      askQuestion();
    }
  }, [selectedHistory]);
  return (
    <div className="grid grid-cols-5 h-screen text-center">
      <div className="col-span-1 bg-zinc-800 pt-3">
        <h1 className="text-white text-xl flex justify-center ">
          <span>Recent History</span>
          <button onClick={clear} type="button" className="cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              viewBox="0 -960 960 960"
              width="20px"
              fill="#75FBFD"
            >
              <path d="M312-144q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-48v-72h192v-48h192v48h192v72h-48v479.57Q720-186 698.85-165T648-144H312Zm336-552H312v480h336v-480ZM384-288h72v-336h-72v336Zm120 0h72v-336h-72v336ZM312-696v480-480Z" />
            </svg>
          </button>
        </h1>
        <ul className="text-left text-sm overflow-auto">
          {qSet &&
            qSet.map((item, index) => {
              return (
                <li
                  onClick={() => setSelectedHistory(item)}
                  className="p-1 pl-5 truncate cursor-pointer hover:bg-zinc-700 hover:text-zinc-200 text-zinc-400"
                  key={index}
                >
                  {item}
                </li>
              );
            })}
        </ul>
      </div>
      <div className="col-span-4 p-10">
        {loader ? (
          <div role="status">
            <svg
              aria-hidden="true"
              className="inline w-8 h-8 text-zinc-400 animate-spin fill-purple-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span class="sr-only">Loading...</span>
          </div>
        ) : null}

        <div ref={scrollToAns} className="container h-120 overflow-auto">
          <div className="text-zinc-300">
            {/* {data} */}
            <ul>
              {data &&
                data.map((item, index) => {
                  return item.type === "q" ? (
                    <li className="flex justify-end p-1" key={index}>
                      <div className="text-right border-8 border-zinc-700 bg-zinc-700 rounded-bl-3xl rounded-tl-3xl rounded-br-3xl w-fit p-1">
                        <Answer
                          ans={item.text}
                          total={data.length}
                          index={index}
                        />
                      </div>
                    </li>
                  ) : (
                    item.text.map((ans, i) => (
                      <li className="text-left p-1" key={`${index}-${i}`}>
                        <Answer ans={ans} total={item.text.length} index={i} />
                      </li>
                    ))
                  );
                })}
            </ul>
          </div>
        </div>
        <div className="bg-zinc-800 w-1/2 m-auto rounded-4xl border border-zinc-700 text-white h-16 flex p-1 pr-5">
          <input
            type="text"
            onKeyDown={isEnter}
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            className="w-full p-3 h-full outline-none"
            placeholder="Ask me anything"
          />
          <button className="cursor-pointer" onClick={askQuestion}>
            Ask
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
