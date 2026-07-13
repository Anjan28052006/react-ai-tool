import { useEffect, useState } from "react";
import "./App.css";
import { URL } from "./constants";
import Answer from "./components/Answers";
import RecentHistory from "./components/RecentHistory";
import Loader from "./components/Loader";
import QuestionAndAnswer from "./components/QuestionAndAnswer";
import QuestionInput from "./components/QuestionInput";

function App() {
  const [question, setQuestion] = useState("");
  const [data, getData] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
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

  const askQuestion = async () => {
    if (!question && !selectedHistory) {
      return false;
    }

    if (question) {
      if (localStorage.getItem("history")) {
        let history = JSON.parse(localStorage.getItem("history"));
        history=history.slice(0,25);
        history = [question, ...history];
        history = history.map((item) => {
          item = item.trim();
          return item.charAt(0).toUpperCase() + item.slice(1);
        });
        history = [...new Set(history)];

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
      Authorization: `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "openai/gpt-oss-120b",
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

  useEffect(() => {
    if (selectedHistory) {
      askQuestion();
    }
  }, [selectedHistory]);
return (
  <div className="h-dvh bg-zinc-950 text-white overflow-hidden">
    <div className="flex h-full overflow-hidden">

      {/* Sidebar */}
      <div
        className={`
          fixed sm:static top-0 left-0 z-50 h-full
          w-[220px] sm:w-[220px]
          bg-zinc-900 border-r border-zinc-700 overflow-y-auto
          transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          sm:translate-x-0
        `}
      >
        <RecentHistory
          recentHistory={recentHistory}
          setSelectedHistory={(item) => {
            setSelectedHistory(item);
            setSidebarOpen(false);
          }}
          qSet={qSet || []}
        />
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 sm:hidden"
        />
      )}

      <div className="flex flex-col flex-1 min-w-0 min-h-0 overflow-hidden">

        {/* Top mobile button */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="sm:hidden self-start m-2 px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700"
        >
          ☰
        </button>

        <div className="flex-1 min-h-0 overflow-y-auto px-3 py-4 sm:px-6 md:px-10">
          <Loader loader={loader} />
          <QuestionAndAnswer data={data} />
        </div>

        <div className="shrink-0 border-t border-zinc-700 bg-zinc-950 px-2 py-3 sm:px-6 md:px-10">
          <QuestionInput
            askQuestion={askQuestion}
            setQuestion={setQuestion}
            question={question}
          />
        </div>

      </div>
    </div>
  </div>
);

}

export default App;
