import React, { useEffect, useState } from "react";
import Square from "./square";

const Board = ({
  lastMove,
  setLastMove,
  playersHistory,
  setPlayersHistory,
  moveLength,
  setMoveLength,
  winner,
  setWinner,
}) => {
  const [player, setPlayer] = useState("x");
  useEffect(() => {
    console.log(lastMove, "lastMove");
  }, [player, lastMove, playersHistory]);

  const pattern = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  useEffect(() => {
    console.log(lastMove, "lastMovelastMovelastMove");
    if (lastMove !== undefined) {
      const updatePlayer = lastMove.player === "x" ? "o" : "x";
      setPlayer(updatePlayer);
    } else {
      setPlayer("x");
    }
  }, [lastMove]);

  const handleChange = (id) => {
    //check if doesnt have value
    const selectedField = playersHistory.find((item) => item.index === id);
    if (selectedField.player !== "" || winner !== null) {
      return;
    }
    //update moveNumber
    setMoveLength(moveLength + 1);
    // Update history
    const updatedHistory = playersHistory.map((item) =>
      item.index === id
        ? { ...item, player: player, moveNumber: moveLength + 1 }
        : item
    );
    setPlayersHistory(updatedHistory);
    //set in query params
    // const toQueryParams = (data) => {
    //   return data
    //     .map((item) => {
    //       return `player=${encodeURIComponent(item.player)}&index=${
    //         item.index
    //       }&moveNumber=${item.moveNumber}`;
    //     })
    //     .join("&");
    // };

    // const queryParams = toQueryParams(updatedHistory);

    //set in localStorage
    const changeFormatofData = JSON.stringify(updatedHistory);
    localStorage.setItem("playerHistory", changeFormatofData);
    //save last move
    setLastMove({ index: id, player: player, moveNumber: moveLength + 1 });

    // Check for a win
    checkWon(updatedHistory);
    // Change player
    // setPlayer(player === "x" ? "o" : "x");
  };

  const checkWon = (history) => {
    // Create a new array to represent the game state
    const gameState = Array(9).fill(""); // Assuming a 3x3 grid

    // Fill the gameState array based on history
    history.forEach((square) => {
      gameState[square.index] = square.player;
    });

    for (let i = 0; i < pattern.length; i++) {
      const [a, b, c] = pattern[i];
      if (
        gameState[a] &&
        gameState[a] === gameState[b] &&
        gameState[a] === gameState[c]
      ) {
        setWinner(gameState[a]); // Set winner
        return;
      }
    }
    if (!gameState.includes("")) {
      setWinner("draw"); // Set draw if all squares are filled without a winner
    }
  };
  return (
    <>
      <div className="md:max-w-[25%] mx-auto w-[60%] border-4 border-yellow-200 ">
        <div className="grid grid-cols-3">
          {playersHistory.map((item, index) => (
            <div className="col-span-1" key={index}>
              <Square
                value={item.player}
                onChange={() => handleChange(index)}
              />
            </div>
          ))}
        </div>
      </div>
      {winner && (
        <div className="mt-4 text-blue-700 text-4xl text-center">
          Winner:{" "}
          <span className="text-blue-500">
            {winner === "draw" ? "It's a draw!" : winner.toUpperCase()}
          </span>
        </div>
      )}
    </>
  );
};

export default Board;
