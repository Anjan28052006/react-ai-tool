export default function QuestionInput({askQuestion,setQuestion,question}){
      const isEnter = (event) => {
    if (event.key == "Enter") {
      askQuestion();
    }
  };
    return <>
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
    </>
}