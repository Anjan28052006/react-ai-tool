import { useState } from "react";
import "./App.css";
import { URL } from "./constants";
import Answer from "./components/Answers";

function App() {
  const [question, setQuestion] = useState("");
  const [data, getData] = useState(undefined);

  const payLoad = {
    contents: [
      {
        parts: [{ text: question }],
      },
    ],
  };

  const askQuestion = async () => {
    let res = await fetch(URL, {
      method: "POST",
      body: JSON.stringify(payLoad),
    });

    res = await res.json();
    let dataString=res.candidates[0].content.parts[0].text;
    dataString=dataString.split("* ");
    dataString=dataString.map((item)=>item.trim())

    getData(dataString);
  };
  return (
    <div className="grid grid-cols-5 h-screen text-center">
      <div className="col-span-1 bg-zinc-800 ">

      </div>
      <div className="col-span-4 p-10">
        <div className="container h-120 overflow-scroll">
          <div className="text-white">
               {/* {data} */}
               <ul>
                {
                  data  && data.map((item,index)=>{
                    return <li className="text-left p-1" key={index} ><Answer ans={item}/></li>
                  })
                }
               </ul>
          </div>
         
        </div>
        <div className="bg-zinc-800 w-1/2 m-auto rounded-4xl border border-zinc-700 text-white h-16 flex p-1 pr-5">
          <input
            type="text"
            onChange={(event) => setQuestion(event.target.value)}
            className="w-full p-3 h-full outline-none"
            placeholder="Ask me anything"
          />
          <button onClick={askQuestion}>Ask</button>
        </div>
      </div>
    </div>
  );
}

export default App;
