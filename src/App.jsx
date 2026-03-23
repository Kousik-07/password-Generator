import React, { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [length, setLength] = useState(10);
  const [allowchar, setAllowchar] = useState(false);
  const [numberallow, setNumberallow] = useState(false);
  const [password, setPassword] = useState("");

  // useRef hook-------------
  const passwordref = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (allowchar) str += "!@#$%^&*()";
    if (numberallow) str += "0123456789";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, allowchar, numberallow, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [length, allowchar, numberallow, passwordGenerator]);

  const copypassword = useCallback(() => {
    passwordref.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <div className="h-screen w-full flex flex-col justify-center bg-linear-to-bl from-violet-500 to-green-500 items-center">
      <h1 className="text-center text-5xl text-white">Password generator</h1>
      <div className="flex justify-center mt-4">
        <div className="bg-gray-700 h-36 w-2xl rounded-3xl">
          <div className="input flex justify-center m-5 overflow-hidden rounded-lg">
            <input
              type="text"
              className="bg-white w-full py-3 px-3 outline-none"
              value={password}
              placeholder="Password"
              readOnly
              ref={passwordref}
            />
            <button
              onClick={copypassword}
              className="outline-none bg-green-600 text-white px-3 py-0.5 shrink-0"
            >
              Copy
            </button>
          </div>
          <div className="flex m-5 text-white gap-10">
            <div className="inputrange flex items-center">
              <input
                type="range"
                min={8}
                max={20}
                value={length}
                className="cursor-pointer accent-green-600"
                onChange={(e) => {
                  setLength(e.target.value);
                }}
              />
              <label htmlFor="range">length:{length}</label>
            </div>
            <div className="inputrange flex items-center">
              <input
                type="checkbox"
                value={allowchar}
                className="cursor-pointer"
                onChange={() => {
                  setAllowchar((prev) => !prev);
                }}
              />
              <label htmlFor="spatial char">Spatial charecter</label>
            </div>
            <div className="inputrange flex items-center">
              <input
                type="checkbox"
                value={numberallow}
                className="cursor-pointer"
                onChange={() => {
                  setNumberallow((prev) => !prev);
                }}
              />
              <label htmlFor="number allow">number allow</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
