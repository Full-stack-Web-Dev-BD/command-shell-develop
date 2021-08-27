import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Axios from "axios";
import Terminal, { ColorMode, LineType } from "react-terminal-ui";
import { toast } from "react-toastify";
import { Button, Card, CardContent } from "@material-ui/core";
export default function Home() {
  const [pathList, setPathList] = useState([
    "c:\\cmd\\cmd.ps1",
    "c:\\cmd\\cmd1.ps1",
    "c:\\cmd\\cmd2.ps1",
  ]);
  const [terminalLineData, setTerminalLineData] = useState([
    { type: LineType.Output, value: "Welcome to Custom  Terminal " },
    {
      type: LineType.Input,
      value: "Type 'clear' to clean Shell  .Start here ... ",
    },
  ]);
  const runPs1 = (e) => {
    toast.info('Running  Ps1 file from "c:\\cmd\\cmd.ps1"');
    Axios.get("/process")
      .then((success) => {
        toast.success('  Ps1 file run complete  from "c:\\cmd\\cmd.ps1"');
      })
      .catch((errr) => {
        toast.error('Ps1 file run  failed  from "c:\\cmd\\cmd.ps1"');
      });
  };
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
        // checking result
        if (res.data.result) {
          let existingLineCommandData = [
            ...terminalLineData,

            {
              type: LineType.Input,
              value: terminalInput,
            },
            {
              type: LineType.Output,
              value: res.data.result,
            },
          ];

          setTerminalLineData(existingLineCommandData);
        } else {
          let existingLineCommandData = [
            ...terminalLineData,

            {
              type: LineType.Input,
              value: terminalInput,
            },
            {
              type: LineType.Output,
              value: res.data.error,
            },
          ];
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
          {/* <div className="container">
            <Terminal
              name=" Custom Application Terminal"
              colorMode={ColorMode.Dark}
              lineData={terminalLineData}
              onInput={(terminalInput) => enterPress(terminalInput)}
            />
          </div> */}
          <div className="col-12">
            <Card>
              <CardContent>
                <h2>Files are running ...</h2>
                <hr />
                {pathList.map((el) => {
                  return <h5> {el} </h5>;
                })}

                <Button variant="contained" onClick={(e) => runPs1()}>
                  Execute
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
