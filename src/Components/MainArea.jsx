import React, { useCallback, useEffect, useRef, useState } from "react";

function MainArea() {
  const [isNumberAllowed, setIsNumberAllowed] = useState(false);
  const [isCharacterAllowed, setIsCharacterAllowed] = useState(false);
  const [length, setLength] = useState(8);
  const [password, setPassword] = useState("");

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (isNumberAllowed) {
      str += "1234567890";
    }
    if (isCharacterAllowed) {
      str += "!@#$%^&*<>";
    }
    for (let index = 1; index <=length; index++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass)
  }, [isCharacterAllowed,isNumberAllowed,length,setPassword]);
  const passRef=useRef(null);
  const copyPassToClipboard=()=>
    {
      window.navigator.clipboard.writeText(password)
      passRef.current?.select()

    }

  useEffect(()=>{passwordGenerator()},[length,isCharacterAllowed,isNumberAllowed,passwordGenerator])

  return (
    <div className="w-full max-w-200 mx-auto h-50 shadow-md  my-4 bg-gray-500 rounded-lg text-center text-yellow-50 text-lg">
      <div className="text-lg font-bold bg-gray-300 rounded-md mx-70 text-black h-10 items-center">
        Password Generator
      </div>

      <div className="py-4 justify-between">
        <input
          type="text"
          className="px-2 mx-2 bg-white rounded-md h-10 w-150 shadow-md text-black font-bold"
            value={password}
            readOnly
            ref={passRef}
        ></input>
        <button onHover onClick={copyPassToClipboard} className="bg-blue-600 hover:bg-blue-950 rounded-md px-6 py-2 shadow-md">
          Copy
        </button>
        <br />
        <div className="flex flex-row justify-end mr-10">
          <div className="mr-75">
            <input
              type="range"
              min={8}
              max={15}
              value={length}
              className="cursor-pointer"
              onChange={(e) => setLength(e.target.value)}
            />
            <label htmlFor="lenght">Lenght:{length}</label>
          </div>
          <div className="px-2">
            <input
              type="checkbox"
              defaultChecked={isNumberAllowed}
              id="isNumberAllowed"
              onChange={() => {
                setIsNumberAllowed((prev) => !prev);
              }}
            />
            <label>Number</label>
          </div>
          <div className="px-2">
            <input
              type="checkbox"
              defaultChecked={isNumberAllowed}
              id="isCharacterAllowed"
              onChange={() => {
                setIsCharacterAllowed((prev) => !prev);
              }}
            />
            <label>Characters</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainArea;
