import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Axios from "axios";
import Terminal, { ColorMode, LineType } from "react-terminal-ui";
import { toast } from "react-toastify";
export default function Home() {
  const [terminalLineData, setTerminalLineData] = useState([
    { type: LineType.Output, value: "Welcome to Custom  Terminal " },
    {
      type: LineType.Input,
      value: "Type 'clear' to clean Shell  .Start here ... ",
    },
  ]);
  const enterPress = (terminalInput) => {
    if (terminalInput == "") return toast("Enter some command ");
    if (
      terminalInput.toLocaleLowerCase() == "clear" ||
      terminalInput.toLocaleLowerCase() == "cls"
    ) {
      setTerminalLineData([
        { type: LineType.Output, value: "Welcome to Custom  Terminal " },
        {
          type: LineType.Input,
          value: "Type 'clear' to clean Shell  .Start here ... ",
        },
      ]);
    } else {
      toast(`Requested to server with " ${terminalInput}"`);
      let existingLineData = [...terminalLineData];
      existingLineData.push({
        type: LineType.Input,
        value: terminalInput,
      });
      setTerminalLineData(existingLineData);

      Axios.post("/command", { command: terminalInput }).then((res) => {
        if (res.data.result) {
          let existingLineCommandData = [...terminalLineData];
          existingLineCommandData.push({
            type: LineType.Output,
            value: res.data.result,
          });
          setTerminalLineData(existingLineCommandData);
        } else {
          let existingLineCommandData = [...terminalLineData];
          existingLineCommandData.push({
            type: LineType.Output,
            value: res.data.error,
            // value: `'${terminalInput}' is not recognized as an internal or external command,operable program or batch file.`,
          });
          setTerminalLineData(existingLineCommandData);
        }
      });
    }
  };
  return (
    <>
      <Navbar title=" Dashboard " />
      <div className="container">
        <div className="row mt-5">
          <div className="container">
            <Terminal
              name=" Custom Application Terminal"
              colorMode={ColorMode.Dark}
              lineData={terminalLineData}
              onInput={(terminalInput) => enterPress(terminalInput)}
            />
          </div>
        </div>
      </div>
    </>
  );
}
