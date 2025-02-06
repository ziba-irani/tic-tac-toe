import React from "react";

const ShowHistory = ({
  //   playerXHistory,
  //   setPlayerXHistory,
  //   playerYHistory,
  //   setPlayerYHistory,
  playersHistory,
  setPlayersHistory,
}) => {
  const FindSquare = (item) => {
    switch (item.index) {
      case 0:
        return `Row 1 ,Column 1 , move:${item.moveNumber}`;
      case 1:
        return `Row 1 ,Column 2 , move:${item.moveNumber}`;
      case 2:
        return `Row 1 ,Column 3 , move:${item.moveNumber}`;
      case 3:
        return `Row 2 ,Column 1 , move:${item.moveNumber}`;
      case 4:
        return `Row 2 ,Column 2 , move:${item.moveNumber}`;
      case 5:
        return `Row 2 ,Column 3 , move:${item.moveNumber}`;
      case 6:
        return `Row 3 ,Column 1 , move:${item.moveNumber}`;
      case 7:
        return `Row 3 ,Column 2 , move:${item.moveNumber}`;
      case 8:
        return `Row 3 ,Column 1 , move:${item.moveNumber}`;
      default:
        return "";
    }
  };
  const handleChangeState = (item) => {
    const updateHistoyByState = playersHistory.map((history) =>
      history.moveNumber > item.moveNumber
        ? { ...history, player: "", moveNumber: 0 }
        : history
    );
    setPlayersHistory(updateHistoyByState);
    //set in localStorage
    const changeFormatofData = JSON.stringify(updateHistoyByState);
    localStorage.setItem("playerHistory", changeFormatofData);
  };
  return (
    <div className="flex-col">
      <div className="flex items-center justify-center">
        <p>Player X History:</p>
        <p className="flex">
          {playersHistory?.map((item) =>
            item.player === "x" ? (
              <div
                className="mx-1 cursor-pointer"
                onClick={() => handleChangeState(item)}
              >{`[${FindSquare(item)}] ,`}</div>
            ) : (
              ""
            )
          )}
        </p>
      </div>
      <div className="flex items-center justify-center">
        <p>Player O History:</p>
        <p className="flex">
          {playersHistory?.map((item) =>
            item.player === "o" ? (
              <div
                className="mx-1 cursor-pointer"
                onClick={() => handleChangeState(item)}
              >{`[${FindSquare(item)}] ,`}</div>
            ) : (
              ""
            )
          )}
        </p>
      </div>
    </div>
  );
};

export default ShowHistory;
