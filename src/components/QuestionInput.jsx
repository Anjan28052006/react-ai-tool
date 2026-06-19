export default function QuestionInput({
  askQuestion,
  setQuestion,
  question,
}) {
  const isEnter = (event) => {
    if (event.key === "Enter") {
      askQuestion();
    }
  };

  return (
    <div className="bg-zinc-800 w-full md:w-3/4 lg:w-1/2 mx-auto rounded-full border border-zinc-700 text-white h-14 md:h-16 flex items-center px-2">
      <input
        type="text"
        onKeyDown={isEnter}
        value={question}
        onChange={(event) => setQuestion(event.target.value)}
        className="w-full bg-transparent px-3 outline-none text-sm md:text-base"
        placeholder="Ask me anything..."
      />

      <button
        className="bg-cyan-500 hover:bg-cyan-400 text-black font-medium px-4 py-2 rounded-full transition cursor-pointer"
        onClick={askQuestion}
      >
        Ask
      </button>
    </div>
  );
}