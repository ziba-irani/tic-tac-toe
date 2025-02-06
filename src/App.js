import { useEffect, useState } from "react";
import Board from "./components";
import ShowHistory from "./components/showHistory";
import RedoUndo from "./components/RedoUndo";

function App() {
  const [moveLength, setMoveLength] = useState(0);
  const [lastMove, setLastMove] = useState();
  const [LocalData, setLocalData] = useState(null); // Start with null or []
  const [winner, setWinner] = useState(null);
  const [playersHistory, setPlayersHistory] = useState([
    { player: "", index: 0, moveNumber: 0 },
    { player: "", index: 1, moveNumber: 0 },
    { player: "", index: 2, moveNumber: 0 },
    { player: "", index: 3, moveNumber: 0 },
    { player: "", index: 4, moveNumber: 0 },
    { player: "", index: 5, moveNumber: 0 },
    { player: "", index: 6, moveNumber: 0 },
    { player: "", index: 7, moveNumber: 0 },
    { player: "", index: 8, moveNumber: 0 },
  ]);

  useEffect(() => {
    const getDataFromLocal = localStorage.getItem("playerHistory");
    if (getDataFromLocal !== null) {
      try {
        const transformedData = JSON.parse(getDataFromLocal);
        setLocalData(transformedData);

        //set lastMove
        const maxMoveObject = transformedData.reduce((max, current) =>
          current.moveNumber > max.moveNumber ? current : max
        );
        console.log(maxMoveObject, "lastMoveapp");
        setLastMove(maxMoveObject);
      } catch (error) {
        console.error("Error parsing JSON from localStorage:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (Array.isArray(LocalData)) {
      setPlayersHistory(LocalData);
    }
  }, [LocalData]);

  return (
    <div className="text-center flex-col justify-center items-center">
      <h1 className="text-3xl py-10 font-sans italic">
        Tik Tac Toe By{" "}
        <span className="text-blue-200 underline">Ziba Irani</span>
      </h1>
      <Board
        playersHistory={playersHistory}
        setPlayersHistory={setPlayersHistory}
        lastMove={lastMove}
        setLastMove={setLastMove}
        moveLength={moveLength}
        setMoveLength={setMoveLength}
        winner={winner}
        setWinner={setWinner}
      />
      <RedoUndo
        playersHistory={playersHistory}
        setPlayersHistory={setPlayersHistory}
        lastMove={lastMove}
        setLastMove={setLastMove}
        setMoveLength={setMoveLength}
        setWinner={setWinner}
      />
      <ShowHistory
        playersHistory={playersHistory}
        setPlayersHistory={setPlayersHistory}
      />
    </div>
  );
}

export default App;
