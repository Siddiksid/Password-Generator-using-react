import { useCallback, useEffect, useRef, useState } from "react";

import "./App.css";

function App() {
  const [length, setLength] = useState(6);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [count, setCount] = useState(0);
  let passwordRef = useRef(null);
  const passwordGenerator = useCallback(() => {
    let pass = "";

    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
    console.log("Password Generated");
  }, [length, charAllowed, numberAllowed, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);
  const copyText = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <>
      <div className="w-full max-w-md mx-auto  shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700 border border-white">
        <h1 className="text-white text-center text-lg my-3">
          Password Generator
        </h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3 mt-1 rounded-lg"
            placeholder="Password"
            ref={passwordRef}
            readOnly
          />
          <button
            onClick={copyText}
            className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 ml-1 rounded-lg"
          >
            copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            className="cursor-pointer "
            id="range"
            onChange={(e) => setLength(e.target.value)}
          />
          <label htmlFor="range">Length : {length}</label>
        </div>
        <div className="flex items-center gap-x-1 mb-1">
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            id="numberInput"
            onChange={() => setNumberAllowed((prev) => !prev)}
          />
          <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={charAllowed}
            id="characterInput"
            onChange={() => {
              setCharAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="characterInput">Characters</label>
        </div>
      </div>

      <div className="text-white">
        <p>The count is {count}</p>
        <button onClick={() => setCount(count + 1)}>increment</button>
      </div>
    </>
  );
}

export default App;
