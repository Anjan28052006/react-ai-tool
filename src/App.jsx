import { useEffect, useState } from "react";
import "./App.css";
import { URL } from "./constants";
import Answer from "./components/Answers";
import RecentHistory from "./components/RecentHistory";
import Loader from "./components/Loader";
import QuestionAndAnswer from "./components/QuestionAndAnswer";

function App() {
  const [question, setQuestion] = useState("");
  const [data, getData] = useState([]);
  const [qSet, recentHistory] = useState(
    JSON.parse(localStorage.getItem("history")),
  );
  const [selectedHistory, setSelectedHistory] = useState("");
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

    const answer = res.choices[0].message.content;

    getData((prev) => [
      ...prev,
      { type: "q", text: question ? question : selectedHistory },
      { type: "a", text: [answer] },
    ]);
    setLoader(false);
    setQuestion("");
  };

  const isEnter = (event) => {
    if (event.key == "Enter") {
      askQuestion();
    }
  };

  useEffect(() => {
    if (selectedHistory) {
      askQuestion();
    }
  }, [selectedHistory]);
  return (
    <div className="grid grid-cols-5 h-screen text-center">
      <RecentHistory
        recentHistory={recentHistory}
        setSelectedHistory={setSelectedHistory}
        qSet={qSet}
      />

      <div className="col-span-4 p-5">
        <Loader loader={loader} />

        <QuestionAndAnswer data={data} />
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
