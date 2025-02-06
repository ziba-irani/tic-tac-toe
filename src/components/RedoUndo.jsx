import React, { useState } from "react";

const RedoUndo = ({
  playersHistory,
  setPlayersHistory,
  lastMove,
  setLastMove,
  setMoveLength,
  setWinner,
}) => {
  const [currentField, setCurrentFeild] = useState();
  const handleUndo = () => {
    setCurrentFeild(lastMove);
    const updatedHistoryByUndo = playersHistory.map((item) =>
      item.index === lastMove.index
        ? { ...item, player: "", moveNumber: 0 }
        : item
    );
    setPlayersHistory(updatedHistoryByUndo);
    localStorage.setItem("playerHistory", updatedHistoryByUndo);
    //update last move
    function getGreatestMoveNumber(array) {
      return array.reduce((max, current) => {
        return current.moveNumber > max.moveNumber ? current : max;
      });
    }
    setLastMove(getGreatestMoveNumber(updatedHistoryByUndo));
  };
  const handleRedo = () => {
    console.log(currentField, "currentField");
    if (currentField) {
      const updatedHistoryByRedo = playersHistory.map((item) =>
        item.index === currentField.index
          ? {
              ...item,
              player: currentField.player,
              moveNumber: currentField.moveNumber,
            }
          : item
      );
      setPlayersHistory(updatedHistoryByRedo);
      localStorage.setItem("playerHistory", updatedHistoryByRedo);
    }
    return;
  };
  const handleClearHistory = () => {
    const clearHistory = playersHistory.map((item) => {
      return { player: "", index: item.index, moveNumber: 0 };
    });
    setPlayersHistory(clearHistory);
    setMoveLength(0);
    localStorage.clear();
    setLastMove();
    setWinner(null);
    setCurrentFeild();
  };
  return (
    <div className="my-5">
      <button className="bg-red-200 mx-5 p-3" onClick={handleRedo}>
        Redo
      </button>
      <button className="bg-blue-200 mx-5 p-3" onClick={handleUndo}>
        Undo
      </button>
      <button className="bg-blue-200 mx-5 p-3" onClick={handleClearHistory}>
        Clear History
      </button>
    </div>
  );
};

export default RedoUndo;
