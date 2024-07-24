import { useState } from 'react';
import styles from './App.module.css'
import { GM } from './game';

function App() {
  const [game, setGame] = useState(new GM());
  const [selectedCell, setSelectedCell] = useState(null);

  const generateMap = () => {
    const map = getMap();
    console.log(map);
    const newGame = new GM();
    newGame.addMap(map);
    setGame(newGame);
  };

  const handleCellClick = (i, j) => {
    if (game.board[i][j].content === "A" && game.player === "A" || game.board[i][j].content === "B" && game.player === "B") {
      setSelectedCell({ i, j });
      console.log(selectedCell)
    } else if (selectedCell) {
      console.log("AKJDLKSJLk")
      const newGame = new GM();
      newGame.board = game.board.map(row => row.map(cell => ({ ...cell })));
      newGame.player = game.player
      const direction = getDirection(selectedCell, { i, j });
      if (direction) {
        console.log(direction)
        if(direction === 'center'){
          setSelectedCell(null);
          return
        }
        newGame.interract(selectedCell.i, selectedCell.j, direction);
        setGame(newGame);
        setSelectedCell(null);
      }
      return
    }
    if(selectedCell && selectedCell.i === i && selectedCell.j === j){
      setSelectedCell(null);
    }
    const newGame = new GM();
    newGame.board = game.board.map(row => row.map(cell => ({ ...cell })));
    newGame.player = game.player
    newGame.add(i,j)
    setGame(newGame);
  };

  const getDirection = (from, to) => {
    const di = to.i - from.i;
    const dj = to.j - from.j;
    if(to.i === from.i && to.j === from.j){
      return "center";
    }
    if (di === 0 && Math.abs(dj) <= 5) {
      return dj > 0 ? 'right' : 'left';
    } else if (dj === 0 && Math.abs(di) <= 5) {
      return di > 0 ? 'down' : 'up';
    }
    return null;
  };

  return (
    <div className={styles.App}>
      <button onClick={generateMap}>MAP</button>
      PLAYER:{game.player}
      <div className={styles.GridContainer}>
        {game.board.map((row, i) => 
          row.map((cell, j) => {
            return (
            <div
              onClick={() => handleCellClick(i, j)}
              className={styles.Square}
              key={`${i}-${j}`}
              style={{ background: selectedCell && selectedCell.i === i && selectedCell.j === j ? 'yellow' : cell.content === "A" ? "blue": cell.content === "X" ? "black" : cell.content === "B" ? "red" : '' }}
            >
            </div>
          )})
        )}
      </div>
    </div>
  );
}

function getMap() {
  let array = [];

  for (let i = 0; i < 20; i++) {
    array.push(Math.round(Math.random() * 399)); // Adjusted range for 20x20 grid
  }

  return array;
}

export default App;
