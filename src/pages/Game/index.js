import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router";
import Cell from "../../components/cell";
import walk from "../../assets/sounds/footstep_concrete_003.ogg";
import push from "../../assets/sounds/push.mp3";
import nope from "../../assets/sounds/nope.mp3";
import { cellType } from "../../assets/levels/cellTypes";
import { useSelector } from "react-redux";
import { selectTheme } from "../../store/theme/selectors";

import "./index.css";

export default function Game() {
  const { id } = useParams();
  const focusDiv = useRef();
  // automatically loads the correct level
  const {
    level,
    initialPlayerPos,
    targets,
  } = require(`../../assets/levels/level${id}`);

  // TODO similarly the theme selected etc
  // TODO perhaps reducer? (easier than props)
  const [gridState, setGridState] = useState(level);
  const [playerPos, setPlayerPos] = useState(initialPlayerPos);
  const [gameOver, setGameOver] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState({});
  const theme = useSelector(selectTheme());

  useEffect(() => {
    setGridState(level);
    setPlayerPos(initialPlayerPos);
    setAudioPlaying({
      push: new Audio(push),
      walk: new Audio(walk),
      nope: new Audio(nope),
    });
  }, []);

  const move = (playerPos, move) => {
    const from = { x: playerPos.x, y: playerPos.y };
    const to = { x: playerPos.x + move.x, y: playerPos.y + move.y };
    const box = isBox(to);
    // shallow copy
    // const grid = [...gridState]
    const grid = JSON.parse(JSON.stringify(gridState));
    if (box && canMove({ x: to.x + move.x, y: to.y + move.y })) {
      grid[from.x][from.y].cellType = cellType.empty;
      grid[to.x][to.y].cellType = cellType.player;
      grid[to.x + move.x][to.y + move.y].cellType = cellType.box;

      setPlayerPos({ ...to, active: !playerPos.active });
      setGridState(grid);
      playSound("push");
    } else if (canMove(to)) {
      grid[from.x][from.y].cellType = cellType.empty;
      grid[to.x][to.y].cellType = cellType.player;
      setPlayerPos({ ...to, active: !playerPos.active });
      setGridState(grid);
      playSound("walk");
    } else {
      playSound("nope");
    }

    setGameOver(isGameOver());
  };

  const playSound = (key) => {
    if (audioPlaying[key]) {
      audioPlaying[key].pause();
      audioPlaying[key].currentTime = 0;
    }
    audioPlaying[key].play();
  };

  const canMove = (to) =>
    !gridState
      .flat()
      .filter(
        (cell) =>
          (cell.cellType === "wall" || cell.cellType === "box") &&
          cell.x === to.x &&
          cell.y === to.y
      ).length;

  const isBox = (to) =>
    gridState
      .flat()
      .filter(
        (cell) => cell.cellType === "box" && cell.x === to.x && cell.y === to.y
      ).length;

  const handleKeyPressed = (e) => {
    switch (e.key) {
      case "ArrowLeft":
        move(playerPos, { x: 0, y: -1 });
        break;
      case "ArrowRight":
        move(playerPos, { x: 0, y: 1 });
        break;
      case "ArrowUp":
        move(playerPos, { x: -1, y: 0 });
        break;
      case "ArrowDown":
        move(playerPos, { x: 1, y: 0 });
        break;
      default:
        return;
    }
  };

  const isGameOver = () =>
    gridState.flat().filter((cell) => cell.cellType === "box" && cell.target)
      .length === targets;

  return (
    <div className="game-wrapper" tabIndex={0} onKeyDown={handleKeyPressed}>
      <div className="grid">
        {gridState.map((row, i) => (
          <div key={i} style={{ display: "flex" }}>
            {row.map((cell, j) => (
              <Cell
                key={j}
                cellType={cell.cellType}
                target={cell.target}
                active={cell.cellType === "player" && playerPos.active}
                theme={theme}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
